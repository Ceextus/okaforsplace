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

-- The server uses the service role. Newer projects don't auto-grant it table privileges,
-- so grant them explicitly (anon/authenticated get nothing).
grant select, insert, update, delete on table public.pre_registrations to service_role;

create index if not exists pre_registrations_created_at_idx
  on public.pre_registrations (created_at desc);
