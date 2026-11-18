-- Okafor's Place — pre-registrations (PRD §8.1). Run once in the Supabase SQL editor.
-- Keep the CHECKs in sync with lib/pre-registration.ts.

create table if not exists public.pre_registrations (
  id          uuid primary key default gen_random_uuid(),
  full_name   text not null check (char_length(full_name) between 2 and 80),
  location    text not null check (char_length(location) between 2 and 80),
  phone       text not null unique check (phone ~ '^\+234[789][01]\d{8}$'),
  source      text not null default 'website',
  user_agent  text,
  created_at  timestamptz not null default now()
);

-- Lock the table down: RLS on, no policies for anon/authenticated.
-- Only the server (service role) can insert; only the dashboard can read.
alter table public.pre_registrations enable row level security;

create index if not exists pre_registrations_created_at_idx
  on public.pre_registrations (created_at desc);
