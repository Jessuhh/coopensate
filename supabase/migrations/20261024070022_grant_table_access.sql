grant usage on schema public to authenticated;

grant select, insert, update, delete
on all tables in schema public
to authenticated;

revoke all privileges
on public.email_allowlist
from anon, authenticated;

alter default privileges in schema public
grant select, insert, update, delete on tables
to authenticated;
