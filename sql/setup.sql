-- DROP TABLE IF EXISTS auth CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS topics CASCADE;
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


CREATE TABLE topics (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE states (
  state_name TEXT NOT NULL PRIMARY KEY,
  abrv TEXT NOT NULL, 
  total_pop TEXT NOT NULL
);

INSERT INTO users (email) VALUES('test@email.com');

INSERT INTO states (state_name, abrv, total_pop) 
VALUES
('alabama', 'AL', '4903185'),
('alaska', 'AK', '731545'),
('arizona', 'AZ', '7278717'),
('arkansas', 'AR', '3017804'),
('california', 'CA', '39512223'),
('colorado', 'CO', '5758736'),
('connecticut', 'CT', '3565287'),
('delaware', 'DE', '973764'),
('florida', 'FL', '21477737'),
('georgia', 'GA', '10617423'),
('hawaii', 'HI', '1415872'),
('idaho', 'ID', '1787065'),
('illinois', 'IL', '12671821'),
('indiana', 'IN', '6732219'),
('iowa', 'IA', '3155070'),
('kansas', 'KS', '2913314'),
('kentucky', 'KY', '4467673'),
('louisiana', 'LA', '4648794'),
('maine', 'ME', '1344212'),
('maryland', 'MD', '6045680'),
('massachusetts', 'MA', '6892503'),
('michigan', 'MI', '9986857'),
('minnesota', 'MN', '5639632'),
('mississippi', 'MS', '2976149'),
('missouri', 'MO', '6137428'),
('montana', 'MT', '1068778'),
('nebraska', 'NB', '1934408'),
('nevada', 'NV', '3080156'),
('new hampshire', 'NH', '1359711'),
('new jersey', 'NJ', '8882190'),
('new mexico', 'NM', '2096829'),
('new york', 'NY', '19453561'),
('north carolina', 'NC', '10488084'),
('north dakota', 'ND', '762062'),
('ohio', 'OH', '11689100'),
('oklahoma', 'OK', '3956971'),
('oregon', 'OR', '4217737'),
('pennsylvania', 'PA', '12801989'),
('rhode island', 'RI', '1059361'),
('south dakota', 'SD', '884659'),
('south carolina', 'SC', '5148714'),
('tennessee', 'TN', '6829174'),
('texas', 'TX', '28995881'),
('utah', 'UT', '3205958'),
('vermont', 'VT', '623989'),
('virginia', 'VA', '8535519'),
('washington', 'WA', '7614893'),
('west virginia', 'WV', '1792147'),
('wisconsin', 'WI', '5822434'),
('wyoming', 'WY', '578759');

-- CREATE TABLE favorites (
--   id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--   email TEXT NOT NULL,
--   FOREIGN KEY (email) REFERENCES users(email)
-- );

