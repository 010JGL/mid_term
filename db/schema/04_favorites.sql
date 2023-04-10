DROP TABLE IF EXISTS favorites CASCADE;


CREATE TABLE favorites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  shoes_id INTEGER REFERENCES shoes(id) ON DELETE CASCADE
);
