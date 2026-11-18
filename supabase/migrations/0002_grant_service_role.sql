-- Okafor's Place — let the server's service role use the pre_registrations table.
-- Run once in the Supabase SQL editor (needed if 0001 was run before this grant was added).
--
-- Newer Supabase projects don't auto-grant table privileges to service_role for tables made
-- in the SQL editor, so inserts from the Server Action failed with
-- "42501 permission denied for table pre_registrations".
-- Only service_role gets access; anon/authenticated get nothing (and RLS stays on).

grant select, insert, update, delete on table public.pre_registrations to service_role;
