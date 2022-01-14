-- DROP TABLE IF EXISTS auth CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS topics CASCADE;
DROP TABLE IF EXISTS states;
DROP TABLE IF EXISTS resources CASCADE; 

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


CREATE TABLE topics (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE states (
  state_name TEXT NOT NULL PRIMARY KEY,
  abrv TEXT NOT NULL
);

INSERT INTO users (email) VALUES('test@email.com');

INSERT INTO states (state_name, abrv) 
VALUES
('alabama', 'AL'),
('alaska', 'AK'),
('arizona', 'AZ'),
('arkansas', 'AR'),
('california', 'CA'),
('colorado', 'CO'),
('connecticut', 'CT'),
('delaware', 'DE'),
('florida', 'FL'),
('georgia', 'GA'),
('hawaii', 'HI'),
('idaho', 'ID'),
('illinois', 'IL'),
('indiana', 'IN'),
('iowa', 'IA'),
('kansas', 'KS'),
('kentucky', 'KY'),
('louisiana', 'LA'),
('maine', 'ME'),
('maryland', 'MD'),
('massachusetts', 'MA'),
('michigan', 'MI'),
('minnesota', 'MN'),
('mississippi', 'MS'),
('missouri', 'MO'),
('montana', 'MT'),
('nebraska', 'NB'),
('nevada', 'NV'),
('new hampshire', 'NH'),
('new jersey', 'NJ'),
('new mexico', 'NM'),
('new york', 'NY'),
('north carolina', 'NC'),
('north dakota', 'ND'),
('ohio', 'OH'),
('oklahoma', 'OK'),
('oregon', 'OR'),
('pennsylvania', 'PA'),
('rhode island', 'RI'),
('south dakota', 'SD'),
('south carolina', 'SC'),
('tennessee', 'TN'),
('texas', 'TX'),
('utah', 'UT'),
('vermont', 'VT'),
('virginia', 'VA'),
('washington', 'WA'),
('west virginia', 'WV'),
('wisconsin', 'WI'),
('wyoming', 'WY');

-- CREATE TABLE favorites (
--   id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--   email TEXT NOT NULL,
--   FOREIGN KEY (email) REFERENCES users(email)
-- );


CREATE TABLE resources (
  resource_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  resource_name TEXT NOT NULL,
  resource_URL TEXT NOT NULL,
  state_abrv TEXT NOT NULL,
  FOREIGN KEY (state_abrv) REFERENCES states(state_abrv);
  topics_id TEXT NOT NULL,
  FOREIGN KEY (topics_id) REFERENCES topics(topics_id);
);
