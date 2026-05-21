-- Schema para o Grana em Ordem (PostgreSQL / Supabase)

CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name_pt TEXT,
  name_en TEXT,
  slug TEXT UNIQUE,
  parent_id TEXT,
  config_json TEXT
);

CREATE TABLE IF NOT EXISTS articles (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE,
  title_pt TEXT,
  content_pt TEXT,
  title_en TEXT,
  content_en TEXT,
  cover_image TEXT,
  cover_alt TEXT,
  category_id TEXT REFERENCES categories(id) ON DELETE SET NULL,
  is_featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Sugestão de categorias iniciais:
-- INSERT INTO categories (id, name_pt, name_en, slug) VALUES 
--   (gen_random_uuid()::text, 'Finanças Pessoais', 'Personal Finance', 'financas-pessoais'),
--   (gen_random_uuid()::text, 'Investimentos', 'Investments', 'investimentos'),
--   (gen_random_uuid()::text, 'Renda Extra', 'Side Income', 'renda-extra'),
--   (gen_random_uuid()::text, 'Planejamento Financeiro', 'Financial Planning', 'planejamento-financeiro');
