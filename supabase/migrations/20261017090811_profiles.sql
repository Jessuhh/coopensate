create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null
);

-- Foreign key
alter table public.activities
add constraint activities_profile_fkey
foreign key (created_by)
references public.profiles(id);

-- Auto generate username
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, name)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'name',
      split_part(new.email, '@', 1),
      'Gebruiker'
    )
  );

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();