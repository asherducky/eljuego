-- El Juego: gold leaderboard + global chat.
-- Run this once in the Supabase dashboard: SQL Editor > New query > paste > Run.
-- (Needs spire.sql to have been run first.)

-- Gold goes on the same leaderboard row as your best Spire floor.
alter table public.spire add column if not exists gold bigint not null default 0;
alter table public.spire drop constraint if exists spire_gold_check;
alter table public.spire add constraint spire_gold_check check (gold between 0 and 1000000000000);
create index if not exists spire_gold_idx on public.spire (gold desc);

-- Global chat: signed-in players read and post; nobody edits or deletes from the game.
create table if not exists public.chat (
  id         bigint generated always as identity primary key,
  user_id    uuid        not null default auth.uid() references auth.users (id) on delete cascade,
  name       text        not null check (char_length(name) between 1 and 16),
  body       text        not null check (char_length(btrim(body)) between 1 and 200),
  created_at timestamptz not null default now()
);

grant select, insert on public.chat to authenticated;
revoke all on public.chat from anon;

alter table public.chat enable row level security;

drop policy if exists "signed-in players read chat" on public.chat;
drop policy if exists "post as yourself, slowly"    on public.chat;

create policy "signed-in players read chat" on public.chat for select to authenticated using (true);
-- You can only post as yourself, and at most one message every 2 seconds.
create policy "post as yourself, slowly" on public.chat for insert to authenticated
  with check (
    auth.uid() = user_id
    and not exists (
      select 1 from public.chat c
      where c.user_id = auth.uid() and c.created_at > now() - interval '2 seconds'
    )
  );

-- Live updates: new messages are pushed to everyone who has the chat open.
do $$ begin
  alter publication supabase_realtime add table public.chat;
exception when duplicate_object then null;
end $$;
