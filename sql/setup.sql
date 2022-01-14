-- DROP TABLE IF EXISTS auth CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS states;
-- CREATE TABLE auth (
--   id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--   email TEXT NOT NULL UNIQUE,
--   password_hash TEXT NOT NULL
-- );

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL,
  username TEXT,
  avatar TEXT
  -- FOREIGN KEY (email) REFERENCES auth(email)
);

INSERT INTO users (email) VALUES('test@email.com');

CREATE TABLE states (
  state_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  state_name TEXT NOT NULL,
  abrv TEXT NOT NULL
);

INSERT INTO states (state_name, abrv) 
VALUES ('Alabama', 'AL'),('Arizona', 'AZ');