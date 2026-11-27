CREATE TABLE public.categories (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 slug text NOT NULL UNIQUE,
 name text NOT NULL,
 image text NOT NULL,
 blurb text NOT NULL DEFAULT '',
 sort_order integer NOT NULL DEFAULT 0,
 created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.categories TO anon, authenticated;
GRANT ALL ON public.categories TO service_role;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public catalog categories" ON public.categories FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.products (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 slug text NOT NULL UNIQUE,
 name text NOT NULL,
 category text NOT NULL REFERENCES public.categories(slug),
 price integer NOT NULL CHECK (price >= 0),
 mrp integer NOT NULL CHECK (mrp >= price),
 image text NOT NULL,
 description text NOT NULL DEFAULT '',
 dimensions text NOT NULL DEFAULT '',
 material text NOT NULL DEFAULT '',
 tags text[] NOT NULL DEFAULT '{}' CHECK (tags <@ ARRAY['featured','bestseller','new']::text[]),
 sort_order integer NOT NULL DEFAULT 0,
 created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon, authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public catalog products" ON public.products FOR SELECT TO anon, authenticated USING (true);
CREATE INDEX products_category_idx ON public.products(category);

INSERT INTO public.categories (slug,name,image,blurb,sort_order) VALUES
('wall-shelves','Wall Shelves','wall-shelf.jpg','Display what you love',0),
('floating-shelves','Floating Shelves','floating-shelf.jpg','Clean, invisible support',1),
('key-holders','Key Holders','key-holder.jpg','Never lose keys again',2),
('wall-decor','Wall Decor','wall-decor.jpg','Hand-finished art',3),
('mdf-furniture','MDF Furniture','mdf-furniture.jpg','Smart, sturdy pieces',4),
('home-organization','Home Organization','organization.jpg','A place for everything',5)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (slug,name,category,price,mrp,image,description,dimensions,material,tags,sort_order) VALUES
('zigzag-wall-shelf','Zig-Zag Wall Shelf','wall-shelves',1499,2199,'wall-shelf.jpg','A sculptural four-tier shelf that turns books and plants into a feature wall. Pre-drilled for easy installation.','90 × 15 × 60 cm','Engineered wood, oak laminate',ARRAY['featured','bestseller'],0),
('ladder-wall-shelf','Ladder Wall Shelf','wall-shelves',1899,2599,'wall-shelf.jpg','Stepped shelving for living rooms and study corners, finished in warm natural tones.','60 × 18 × 90 cm','Sheesham wood',ARRAY['new'],1),
('walnut-floating-shelf-set','Walnut Floating Shelf (Set of 3)','floating-shelves',2299,3199,'floating-shelf.jpg','Hidden-bracket floating shelves that hold up to 8 kg each. A timeless walnut finish.','80 × 20 × 4 cm each','MDF, walnut veneer',ARRAY['featured','bestseller'],2),
('oak-floating-shelf','Oak Floating Shelf','floating-shelves',999,1399,'floating-shelf.jpg','A single minimal ledge for photos, plants or spices.','60 × 15 × 4 cm','MDF, oak veneer',ARRAY['new'],3),
('little-house-key-holder','Little House Key Holder','key-holders',649,899,'key-holder.jpg','A charming house-shaped key holder with four brass hooks for your entryway.','28 × 3 × 22 cm','Pine wood, brass hooks',ARRAY['bestseller','new'],4),
('entryway-key-rack','Entryway Key Rack','key-holders',799,1099,'key-holder.jpg','Slim key rack with a mail ledge on top.','35 × 6 × 15 cm','Mango wood',ARRAY[]::text[],5),
('carved-mandala-panel','Carved Mandala Wall Panel','wall-decor',3499,4999,'wall-decor.jpg','Hand-finished mandala panel inspired by Rajasthani jaali work. A true statement piece.','75 cm diameter','MDF, hand-stained',ARRAY['featured','bestseller'],6),
('lotus-wall-art','Lotus Wall Art','wall-decor',1999,2799,'wall-decor.jpg','Delicate lotus motif in layered wood for prayer rooms and living spaces.','50 cm diameter','MDF, antique finish',ARRAY['new'],7),
('nordic-bedside-table','Nordic Bedside Table','mdf-furniture',4299,5999,'mdf-furniture.jpg','A bedside table with a soft-close drawer and open shelf on splayed legs.','45 × 35 × 55 cm','MDF, oak laminate, solid wood legs',ARRAY['featured','new'],8),
('compact-study-cabinet','Compact Study Cabinet','mdf-furniture',5499,7499,'mdf-furniture.jpg','Sturdy cabinet with a drawer and shelf, sized for compact homes.','50 × 40 × 75 cm','Pre-laminated MDF',ARRAY['bestseller'],9),
('wall-organizer-with-baskets','Wall Organizer with Baskets','home-organization',2799,3699,'organization.jpg','Wall rack with hooks, a top shelf and three woven baskets.','80 × 20 × 55 cm','Pine wood, cane baskets',ARRAY['featured'],10),
('desk-organizer-set','Desk Organizer Set','home-organization',1199,1599,'organization.jpg','Three-piece modular desk organizer with mini drawers.','45 × 15 × 18 cm','Engineered wood',ARRAY['new','bestseller'],11)
ON CONFLICT (slug) DO NOTHING;
COMMENT ON COLUMN public.products.image IS 'Existing bundled asset filename resolved by the storefront, or a future absolute image URL; never a deployment-specific hashed path.';
COMMENT ON COLUMN public.categories.image IS 'Existing bundled asset filename resolved by the storefront, or a future absolute image URL.';