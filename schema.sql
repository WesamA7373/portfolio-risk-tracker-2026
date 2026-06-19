-- Users table
create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  full_name text
);

-- Portfolios table
create table portfolios (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  name text not null
);

-- Assets table
create table assets (
  id uuid primary key default gen_random_uuid(),
  portfolio_id uuid references portfolios(id) on delete cascade,
  asset_name text not null,
  asset_type text,
  risk_score numeric
);

-- Enable Row Level Security (RLS)
alter table users enable row level security;
alter table portfolios enable row level security;
alter table assets enable row level security;

-- Policies for Users table
create policy "Users are publicly readable"
on users for select
using (true);

create policy "Users can view own profile"
on users for select
using (auth.uid() = id);

create policy "Users can insert own profile"
on users for insert
with check (auth.uid() = id);

-- Policies for Portfolios table
create policy "Users can view own portfolios"
on portfolios for select
using (auth.uid() = user_id);

create policy "Users can insert own portfolios"
on portfolios for insert
with check (auth.uid() = user_id);

-- Policies for Assets table
create policy "Users can view own assets"
on assets for select
using (
  auth.uid() = (
    select user_id from portfolios where portfolios.id = assets.portfolio_id
  )
);

create policy "Users can insert own assets"
on assets for insert
with check (
  auth.uid() = (
    select user_id from portfolios where portfolios.id = assets.portfolio_id
  )
);
