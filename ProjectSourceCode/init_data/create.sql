DROP TABLE IF EXISTS users;
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE,
  password VARCHAR(100) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL
);

DROP TABLE IF EXISTS items;
CREATE TABLE items (
  item_id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  price SMALLINT,
  image_url VARCHAR(200) NOT NULL,
  link VARCHAR(200),
  description VARCHAR(200),
  brand VARCHAR(50)
);

DROP TABLE IF EXISTS categories;
CREATE TABLE categories (
  category_id SERIAL PRIMARY KEY,
  category_name VARCHAR(100) NOT NULL UNIQUE
);

DROP TABLE IF EXISTS outfits;
CREATE TABLE outfits (
  outfit_id SERIAL PRIMARY KEY,
  outfit_name VARCHAR(100) UNIQUE NOT NULL,
  price SMALLINT,
  image_url VARCHAR(200) NOT NULL,
  link VARCHAR(200),
  description VARCHAR(200),
);

DROP TABLE IF EXISTS users_to_items;
CREATE TABLE IF NOT EXISTS users_to_items (
  user_id INTEGER NOT NULL REFERENCES users (user_id),
  item_id INTEGER NOT NULL REFERENCES items (item_id)
);

DROP TABLE IF EXISTS users_to_outfits;
CREATE TABLE IF NOT EXISTS users_to_outfits (
  user_id INTEGER NOT NULL REFERENCES users (user_id),
  outfit_id INTEGER NOT NULL REFERENCES outfits (outfit_id)
);

DROP TABLE IF EXISTS items_to_outfits;
CREATE TABLE IF NOT EXISTS items_to_outfits (
  item_id INTEGER NOT NULL REFERENCES items (item_id),
  outfit_id INTEGER NOT NULL REFERENCES outfits (outfit_id)
);

DROP TABLE IF EXISTS items_to_categories;
CREATE TABLE IF NOT EXISTS items_to_categories (
  item_id INTEGER NOT NULL REFERENCES items (item_id),
  category_id INTEGER NOT NULL REFERENCES categories (category_id)
);

\dt;