-- Okafor's Place — add email to pre-registrations (client request).
-- Run once in the Supabase SQL editor, BEFORE deploying the form that sends email.
--
-- The website requires an email for new sign-ups; the column allows NULL only so rows
-- saved before this change stay valid. Keep the CHECK in sync with lib/pre-registration.ts.

alter table public.pre_registrations
  add column if not exists email text
  check (email is null or (char_length(email) <= 254 and email ~ '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$'));

-- Make the new column visible to the API straight away.
notify pgrst, 'reload schema';
