-- Schéma Supabase pour les réservations NOYA.
-- À exécuter dans l'éditeur SQL de Supabase. L'API n'utilise que la clé service_role (côté serveur).

create table if not exists reservations (
  id text primary key,
  created_at timestamptz not null default now(),
  status text not null check (status in ('pending', 'confirmed', 'cancelled')),
  date date not null,
  time text not null,
  minutes integer not null,
  party_size integer not null check (party_size between 1 and 8),
  tables integer not null,
  space text not null check (space in ('interieur', 'terrasse')),
  space_preference text not null,
  occasion text,
  shisha text,
  notes text,
  first_name text not null,
  last_name text not null,
  phone text not null,
  email text not null,
  locale text not null default 'fr'
);

create index if not exists reservations_date_idx on reservations (date);

create table if not exists blocked_dates (
  date date primary key
);

-- Aucune politique publique : seules les routes API (service_role) lisent/écrivent.
alter table reservations enable row level security;
alter table blocked_dates enable row level security;
