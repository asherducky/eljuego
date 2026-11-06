-- El Juego: keeps admin accounts off the leaderboards (Tower, gold and PvP rating).
-- Run admin.sql first. Then run this once: SQL Editor > New query > paste > Run.

-- Remove admins' current leaderboard rows.
delete from public.spire where user_id in (select user_id from public.admins);
delete from public.pvp   where user_id in (select user_id from public.admins);

-- From now on the server refuses leaderboard posts from admins.
-- "restrictive" means this rule applies on top of the existing ones.
drop policy if exists "admins stay off the tower board" on public.spire;
drop policy if exists "admins stay off the tower board (update)" on public.spire;
drop policy if exists "admins stay off the arena" on public.pvp;
drop policy if exists "admins stay off the arena (update)" on public.pvp;
create policy "admins stay off the tower board" on public.spire as restrictive for insert to authenticated with check (not public.is_admin());
create policy "admins stay off the tower board (update)" on public.spire as restrictive for update to authenticated using (not public.is_admin());
create policy "admins stay off the arena" on public.pvp as restrictive for insert to authenticated with check (not public.is_admin());
create policy "admins stay off the arena (update)" on public.pvp as restrictive for update to authenticated using (not public.is_admin());
