-- Partner orders (e.g. Kværnerbyen renseri + Hently levering)
-- Kjør i Supabase: SQL Editor → New query → Lim inn → Run

create table if not exists public.partner_orders (
  id uuid primary key default gen_random_uuid(),
  partner_slug text not null default 'kvaernerbyen',
  customer_name text not null,
  phone text not null,
  address text not null,
  postal_code text not null,
  shop_order_number text not null,
  garment_count integer not null check (garment_count > 0),
  cleaning_amount numeric(10, 2) not null check (cleaning_amount >= 0),
  delivery_fee numeric(10, 2) not null default 119 check (delivery_fee >= 0),
  total_amount numeric(10, 2) generated always as (cleaning_amount + delivery_fee) stored,
  delivery_time_option text not null check (delivery_time_option in ('asap', 'scheduled')),
  delivery_time_at timestamptz,
  payment_status text not null default 'pending'
    check (payment_status in ('pending', 'paid', 'failed', 'refunded')),
  delivery_status text not null default 'new'
    check (delivery_status in ('new', 'awaiting_dispatch', 'in_transit', 'delivered', 'cancelled')),
  stripe_payment_intent_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists partner_orders_payment_status_idx
  on public.partner_orders (payment_status);
create index if not exists partner_orders_delivery_status_idx
  on public.partner_orders (delivery_status);
create index if not exists partner_orders_partner_slug_idx
  on public.partner_orders (partner_slug);
create index if not exists partner_orders_created_at_idx
  on public.partner_orders (created_at desc);

create or replace function public.set_partner_orders_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists partner_orders_updated_at on public.partner_orders;
create trigger partner_orders_updated_at
  before update on public.partner_orders
  for each row execute function public.set_partner_orders_updated_at();

alter table public.partner_orders enable row level security;

-- Valgfritt: direkte insert fra klient med anon-nøkkel (API bruker service_role)
drop policy if exists "anon_insert_partner_orders" on public.partner_orders;
create policy "anon_insert_partner_orders"
  on public.partner_orders
  for insert
  to anon
  with check (true);

-- service_role har full tilgang via nøkkelen (bypasser RLS)
