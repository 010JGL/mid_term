-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  listing_id INTEGER NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);

CREATE TABLE admins (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id)
)

CREATE TABLE shoes (
  id SERIAL PRIMARY KEY NOT NULL,
  gender ENUM('male', 'female'),
  price INTEGER NOT NULL,
  brand TEXT NOT NULL,
  size ENUM('5', '6', '7', '8', '9', '10', '11', '12', '13'),
  seller_id INTEGER REFERENCES admins(id),
  image_url VARCHAR(255) NOT NULL,
  is_sold BOOLEAN NOT NULL,
  description TEXT NOT NULL
)
-- image_url is our thumbnail picture, we only have one for now. We could add more but its stretch

CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  shoes_id INTEGER REFERENCES shoes(id),
  content TEXT NOT NULL,
  date SMALLDATETIME NOT NULL
)

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  shoes_id INTEGER REFERENCES shoes(id)
)
