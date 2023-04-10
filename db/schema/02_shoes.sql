DROP TABLE IF EXISTS shoes CASCADE;


CREATE TABLE shoes (
  id SERIAL PRIMARY KEY NOT NULL,
  gender VARCHAR(255),
  price INTEGER NOT NULL,
  brand TEXT,
  size VARCHAR(255),
  seller_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  image_url VARCHAR(255) NOT NULL,
  is_sold BOOLEAN NOT NULL DEFAULT FALSE,
  description TEXT
);

-- image_url is our thumbnail picture, we only have one for now.
-- We could add more but its stretch
