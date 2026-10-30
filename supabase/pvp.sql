-- El Juego: PvP arena (async duels against other players' saved builds).
-- Run this once in the Supabase dashboard: SQL Editor > New query > paste > Run.

-- One row per player: a snapshot of their build, plus their arena rating and record.
create table if not exists public.pvp (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  name       text        not null check (char_length(name) between 1 and 16),
  level      int         not null default 1 check (level between 1 and 100),
  rating     int         not null default 1000 check (rating between 0 and 10000),
  wins       int         not null default 0 check (wins >= 0),
  losses     int         not null default 0 check (losses >= 0),
  snap       jsonb       not null,
  updated_at timestamptz not null default now()
);

-- Signed-in players can see everyone's build (to fight it); each player can only write their own row.
grant select, insert, update on public.pvp to authenticated;
revoke all on public.pvp from anon;

alter table public.pvp enable row level security;

drop policy if exists "signed-in players read the arena" on public.pvp;
drop policy if exists "post own build"                    on public.pvp;
drop policy if exists "update own build"                  on public.pvp;

create policy "signed-in players read the arena" on public.pvp for select to authenticated using (true);
create policy "post own build"   on public.pvp for insert to authenticated with check (auth.uid() = user_id);
create policy "update own build" on public.pvp for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index if not exists pvp_rating_idx on public.pvp (rating desc);
