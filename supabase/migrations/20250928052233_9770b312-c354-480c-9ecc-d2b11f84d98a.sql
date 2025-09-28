-- Add the constraint for the new roles
ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_role_check 
CHECK (role IN ('household_user', 'collector', 'recycler', 'regulator', 'administrator'));

-- Update RLS policies to include new roles
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all feedback" ON public.feedback;
DROP POLICY IF EXISTS "Admins can update feedback" ON public.feedback;
DROP POLICY IF EXISTS "Admins and recyclers can update pickup requests" ON public.pickup_requests;
DROP POLICY IF EXISTS "Recyclers can view assigned pickup requests" ON public.pickup_requests;

-- Create updated policies for administrators and collectors/recyclers
CREATE POLICY "Administrators can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.user_id = auth.uid()) AND (profiles.role = 'administrator'))));

CREATE POLICY "Administrators can view all feedback" 
ON public.feedback 
FOR SELECT 
USING (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.user_id = auth.uid()) AND (profiles.role = 'administrator'))));

CREATE POLICY "Administrators can update feedback" 
ON public.feedback 
FOR UPDATE 
USING (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.user_id = auth.uid()) AND (profiles.role = 'administrator'))));

CREATE POLICY "Administrators and recyclers can update pickup requests" 
ON public.pickup_requests 
FOR UPDATE 
USING (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.user_id = auth.uid()) AND (profiles.role = ANY (ARRAY['administrator', 'recycler', 'collector'])))));

CREATE POLICY "Recyclers and collectors can view assigned pickup requests" 
ON public.pickup_requests 
FOR SELECT 
USING ((auth.uid() = assigned_recycler) OR (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.user_id = auth.uid()) AND (profiles.role = ANY (ARRAY['administrator', 'recycler', 'collector']))))));