-- Hindrer at bekreftelses-e-post sendes to ganger (confirm + webhook)
alter table public.partner_orders
  add column if not exists confirmation_email_sent_at timestamptz;
