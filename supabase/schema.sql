-- El Juego: accounts + cloud saves.
-- Run this once in the Supabase dashboard: SQL Editor > New query > paste > Run.

-- One save per player. The whole game state is stored as JSON.
create table if not exists public.saves (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  data       jsonb       not null,
  name       text,
  level      int,
  updated_at timestamptz not null default now()
);

-- Signed-in players may use the table at all (rows are still filtered by the policies below).
-- Needed if "Automatically expose new tables" was turned off; harmless if it was on.
grant select, insert, update, delete on public.saves to authenticated;
revoke all on public.saves from anon;

-- Row level security: a signed-in player can only see and change their own save.
alter table public.saves enable row level security;

drop policy if exists "read own save"   on public.saves;
drop policy if exists "insert own save" on public.saves;
drop policy if exists "update own save" on public.saves;
drop policy if exists "delete own save" on public.saves;

create policy "read own save"   on public.saves for select using (auth.uid() = user_id);
create policy "insert own save" on public.saves for insert with check (auth.uid() = user_id);
create policy "update own save" on public.saves for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "delete own save" on public.saves for delete using (auth.uid() = user_id);
