REVOKE INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER ON public.products, public.categories FROM anon, authenticated;
GRANT SELECT ON public.products, public.categories TO anon, authenticated;
GRANT ALL ON public.products, public.categories TO service_role;