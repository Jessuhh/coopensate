create table public.email_allowlist (
  email text primary key
);

insert into public.email_allowlist (email)
values
  ('jessuhh0@gmail.com'),
  ('fleur8veldkamp@gmail.com');

alter table public.email_allowlist enable row level security;

revoke all on public.email_allowlist
from public, anon, authenticated;

create or replace function public.check_email_allowlist(event jsonb)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  requested_email text;
begin
  requested_email := lower(trim(event->'user'->>'email'));

  if exists (
    select 1
    from public.email_allowlist
    where lower(email) = requested_email
  ) then
    return '{}'::jsonb;
  end if;

  return jsonb_build_object(
    'error', jsonb_build_object(
      'http_code', 403,
      'message', 'Dit e-mailadres is niet toegestaan.'
    )
  );
end;
$$;

grant usage on schema public to supabase_auth_admin;

grant execute on function public.check_email_allowlist(jsonb)
to supabase_auth_admin;

revoke execute on function public.check_email_allowlist(jsonb)
from public, anon, authenticated;