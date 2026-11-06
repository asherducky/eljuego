-- El Juego: bans. A banned account can still play on its own device, but the server refuses
-- its cloud saves, leaderboard posts and chat, and hides it from the leaderboards, the PvP arena and chat.
-- Run admin.sql first. Then run this once: SQL Editor > New query > paste > Run.

create table if not exists public.bans (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  name       text,
  reason     text,
  created_at timestamptz not null default now()
);
alter table public.bans enable row level security;
revoke all on public.bans from anon;
grant select, insert, delete on public.bans to authenticated;

create or replace function public.is_banned() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.bans where user_id = auth.uid())
$$;
create or replace function public.banned(u uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.bans where user_id = u)
$$;

-- Players can see whether they are banned; admins see every ban and are the only ones who can ban or unban.
-- Admins themselves cannot be banned.
drop policy if exists "see own ban, admins see all" on public.bans;
drop policy if exists "admins ban"   on public.bans;
drop policy if exists "admins unban" on public.bans;
create policy "see own ban, admins see all" on public.bans for select to authenticated using (auth.uid() = user_id or public.is_admin());
create policy "admins ban"   on public.bans for insert to authenticated with check (public.is_admin() and user_id not in (select a.user_id from public.admins a));
create policy "admins unban" on public.bans for delete to authenticated using (public.is_admin());

-- Banned accounts cannot write anything online. ("restrictive" applies on top of the existing rules.)
drop policy if exists "banned: no save upload" on public.saves;
drop policy if exists "banned: no save update" on public.saves;
create policy "banned: no save upload" on public.saves as restrictive for insert to authenticated with check (not public.is_banned());
create policy "banned: no save update" on public.saves as restrictive for update to authenticated using (not public.is_banned() or public.is_admin());

drop policy if exists "banned: no tower post"   on public.spire;
drop policy if exists "banned: no tower update" on public.spire;
drop policy if exists "banned: hidden on board" on public.spire;
create policy "banned: no tower post"   on public.spire as restrictive for insert to authenticated with check (not public.is_banned());
create policy "banned: no tower update" on public.spire as restrictive for update to authenticated using (not public.is_banned());
create policy "banned: hidden on board" on public.spire as restrictive for select using (not public.banned(user_id));

drop policy if exists "banned: no arena post"   on public.pvp;
drop policy if exists "banned: no arena update" on public.pvp;
drop policy if exists "banned: hidden in arena" on public.pvp;
create policy "banned: no arena post"   on public.pvp as restrictive for insert to authenticated with check (not public.is_banned());
create policy "banned: no arena update" on public.pvp as restrictive for update to authenticated using (not public.is_banned());
create policy "banned: hidden in arena" on public.pvp as restrictive for select using (not public.banned(user_id));

drop policy if exists "banned: no chat"          on public.chat;
drop policy if exists "banned: chat hidden"      on public.chat;
create policy "banned: no chat"     on public.chat as restrictive for insert to authenticated with check (not public.is_banned());
create policy "banned: chat hidden" on public.chat as restrictive for select using (not public.banned(user_id));
