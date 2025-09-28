-- Drop the existing constraint first
ALTER TABLE public.profiles 
DROP CONSTRAINT IF EXISTS profiles_role_check;

-- Update role column without constraint first
ALTER TABLE public.profiles 
ALTER COLUMN role SET DEFAULT 'household_user';