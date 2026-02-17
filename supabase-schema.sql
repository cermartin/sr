-- Run this in the Supabase SQL Editor (https://app.supabase.com → your project → SQL Editor)

-- Orders table
create table orders (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  email text not null,
  phone text,
  first_name text not null,
  last_name text not null,
  address text not null,
  city text not null,
  postcode text not null,
  country text not null,
  card_last_four text,
  subtotal numeric not null,
  shipping numeric not null,
  total numeric not null,
  items jsonb not null
);

-- Quiz submissions table
create table quiz_submissions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  name text not null,
  email text not null,
  location text not null,
  usage text not null,
  cleaning text not null
);

-- Enable Row Level Security
alter table orders enable row level security;
alter table quiz_submissions enable row level security;

-- Allow anonymous inserts (the anon key can only insert, not read/update/delete)
create policy "Allow anonymous inserts" on orders
  for insert with check (true);

create policy "Allow anonymous inserts" on quiz_submissions
  for insert with check (true);

-- Site visit counter
create table site_visits (
  id int primary key default 1,
  count int not null default 0,
  constraint single_row check (id = 1)
);

insert into site_visits (id, count) values (1, 0);

alter table site_visits enable row level security;

create policy "Allow anonymous read" on site_visits
  for select using (true);

-- Function to atomically increment the counter
create or replace function increment_visits()
returns void as $$
  update site_visits set count = count + 1 where id = 1;
$$ language sql security definer;
