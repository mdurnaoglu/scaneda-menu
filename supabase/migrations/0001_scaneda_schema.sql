create extension if not exists pgcrypto;

create table if not exists public.restaurants (
  id text primary key,
  name text not null,
  slug text not null unique,
  logo text not null,
  cover_image text,
  primary_color text not null,
  secondary_color text not null,
  theme_mode text not null check (theme_mode in ('light', 'dark')),
  status text not null check (status in ('active', 'inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.users (
  id text primary key,
  username text not null unique,
  password_hash text not null,
  restaurant_id text not null references public.restaurants(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id text primary key,
  restaurant_id text not null references public.restaurants(id) on delete cascade,
  image text not null,
  sort_order integer not null check (sort_order > 0),
  title_en text not null,
  title_ru text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id text primary key,
  restaurant_id text not null references public.restaurants(id) on delete cascade,
  category_id text not null references public.categories(id) on delete cascade,
  image text not null,
  price numeric(10,2) not null check (price >= 0),
  sort_order integer not null check (sort_order > 0),
  title_en text not null,
  description_en text not null,
  title_ru text not null,
  description_ru text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists categories_restaurant_sort_idx
  on public.categories (restaurant_id, sort_order);

create index if not exists products_restaurant_sort_idx
  on public.products (restaurant_id, sort_order);

create index if not exists products_category_sort_idx
  on public.products (category_id, sort_order);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists restaurants_set_updated_at on public.restaurants;
create trigger restaurants_set_updated_at
before update on public.restaurants
for each row execute function public.set_updated_at();

drop trigger if exists users_set_updated_at on public.users;
create trigger users_set_updated_at
before update on public.users
for each row execute function public.set_updated_at();

drop trigger if exists categories_set_updated_at on public.categories;
create trigger categories_set_updated_at
before update on public.categories
for each row execute function public.set_updated_at();

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
before update on public.products
for each row execute function public.set_updated_at();

alter table public.restaurants enable row level security;
alter table public.users enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;

drop policy if exists "public can read active restaurants" on public.restaurants;
create policy "public can read active restaurants"
on public.restaurants
for select
to anon, authenticated
using (status = 'active');

drop policy if exists "public can read categories of active restaurants" on public.categories;
create policy "public can read categories of active restaurants"
on public.categories
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.restaurants
    where restaurants.id = categories.restaurant_id
      and restaurants.status = 'active'
  )
);

drop policy if exists "public can read products of active restaurants" on public.products;
create policy "public can read products of active restaurants"
on public.products
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.restaurants
    where restaurants.id = products.restaurant_id
      and restaurants.status = 'active'
  )
);

insert into storage.buckets (id, name, public)
values ('restaurant-assets', 'restaurant-assets', true)
on conflict (id) do nothing;
