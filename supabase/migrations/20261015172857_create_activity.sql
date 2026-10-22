-- activity_type
create table public.activities_types (
  id text primary key,
  emission_factor numeric not null,
  unit text not null
);

insert into public.activities_types (id, emission_factor, unit)
values
  ('cycle', 170, 'kilometer'),
  ('eat_less_beef', 99, 'gram'),
  ('eat_less_chicken', 40, 'gram'),
  ('eat_less_pork', 12, 'gram'),
  ('eat_less_lamb', 10, 'gram'),
  ('emission', 1, ''),
  ('carpool', 170, 'kilometer'),
  ('no_tv', 220, 'day'),
  ('shorter_shower', 170, 'minute');

-- activity
create table public.activities (
  id text primary key,
  emission numeric not null,
  type_id text not null references public.activities_types(id),
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

-- activity_user
create table public.activities_users (
  id text primary key,
  activity_id text not null references public.activities(id),
  user_id uuid not null references auth.users(id) on delete cascade
);
