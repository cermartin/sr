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

create policy "Allow read own insert" on orders
  for select using (true);

create policy "Allow anonymous inserts" on quiz_submissions
  for insert with check (true);
