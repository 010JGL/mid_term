-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS admins CASCADE;
DROP TABLE IF EXISTS shoes CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  listing_id INTEGER NOT NULL,
  email VARCHAR(255) NOT NULL
  password VARCHAR(255) NOT NULL,
);
--  Not sure about listing_id

CREATE TABLE admins (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
)

CREATE TABLE shoes (
  id SERIAL PRIMARY KEY NOT NULL,
  gender ENUM('male', 'female'),
  price INTEGER NOT NULL,
  brand TEXT,
  size ENUM('5', '6', '7', '8', '9', '10', '11', '12', '13'),
  seller_id INTEGER REFERENCES admins(id) ON DELETE CASCADE,
  image_url VARCHAR(255) NOT NULL,
  is_sold BOOLEAN NOT NULL DEFAULT FALSE,
  description TEXT
)

-- image_url is our thumbnail picture, we only have one for now. We could add more but its stretch

CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  shoes_id INTEGER REFERENCES shoes(id) ON DELETE CASCADE,
  message TEXT,
  date SMALLDATETIME NOT NULL
)

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  shoes_id INTEGER REFERENCES shoes(id) ON DELETE CASCADE
)
