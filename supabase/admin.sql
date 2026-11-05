-- El Juego: lets admin accounts read and change every player's cloud save.
-- Run this once in the Supabase dashboard: SQL Editor > New query > paste > Run.
-- Before you run it, change YOURNAME on the last line to your in-game username.

-- Who is an admin. Only you can add rows, from this SQL editor.
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade
);
alter table public.admins enable row level security;
revoke all on public.admins from anon;
grant select on public.admins to authenticated;
drop policy if exists "see own admin row" on public.admins;
create policy "see own admin row" on public.admins for select using (auth.uid() = user_id);

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where user_id = auth.uid())
$$;

-- Admins can read and update every save (normal players still only see their own).
drop policy if exists "admins read all saves"   on public.saves;
drop policy if exists "admins update all saves" on public.saves;
create policy "admins read all saves"   on public.saves for select using (public.is_admin());
create policy "admins update all saves" on public.saves for update using (public.is_admin()) with check (public.is_admin());

-- Make yourself an admin. Change YOURNAME to your username (the one you sign in with).
insert into public.admins (user_id)
select id from auth.users where email = lower('YOURNAME') || '@rpgjuego.pages.dev'
on conflict do nothing;

-- To check it worked, this should show one row:
-- select * from public.admins;
