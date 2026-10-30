-- El Juego: Endless Spire leaderboard.
-- Run this once in the Supabase dashboard: SQL Editor > New query > paste > Run.

-- One row per player: their best Spire floor.
create table if not exists public.spire (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  name       text        not null check (char_length(name) between 1 and 16),
  best       int         not null check (best between 0 and 1000),
  level      int         not null default 1 check (level between 1 and 100),
  updated_at timestamptz not null default now()
);

-- Everyone (even signed-out visitors) can read the board; only signed-in players can write.
grant select on public.spire to anon, authenticated;
grant insert, update on public.spire to authenticated;

alter table public.spire enable row level security;

drop policy if exists "anyone reads the board" on public.spire;
drop policy if exists "post own score"         on public.spire;
drop policy if exists "update own score"       on public.spire;

create policy "anyone reads the board" on public.spire for select using (true);
create policy "post own score"   on public.spire for insert with check (auth.uid() = user_id);
create policy "update own score" on public.spire for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index if not exists spire_best_idx on public.spire (best desc, updated_at asc);
