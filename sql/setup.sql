DROP TABLE IF EXISTS auth CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS states CASCADE;
DROP TABLE IF EXISTS populations CASCADE;
DROP TABLE IF EXISTS topics CASCADE;
DROP TABLE IF EXISTS additional_data CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;
DROP TABLE IF EXISTS resources; 

CREATE TABLE auth (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL
);

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  auth_email TEXT NOT NULL UNIQUE,
  username TEXT,
  avatar TEXT,
  FOREIGN KEY (auth_email) REFERENCES auth(email)
);

CREATE TABLE topics (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE states (
  state_name TEXT NOT NULL PRIMARY KEY,
  abrv TEXT UNIQUE NOT NULL
);

CREATE TABLE resources (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  resource_name TEXT NOT NULL,
  resource_url TEXT NOT NULL,
  state_abrv TEXT,
  topics_id BIGINT,
  FOREIGN KEY (state_abrv) REFERENCES states(abrv),
  FOREIGN KEY (topics_id) REFERENCES topics(id)
);

CREATE TABLE favorites (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  image TEXT NOT NULL,
  user_id BIGINT NOT NULL REFERENCES users(id),
  topic_id BIGINT NOT NULL REFERENCES topics(id)
);


CREATE TABLE populations (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  state_abrv TEXT,
  total NUMERIC,
  lgbt NUMERIC,
  aa NUMERIC,
  latinx NUMERIC,
  -- api NUMERIC,
  FOREIGN KEY (state_abrv) REFERENCES states(abrv)
);


INSERT INTO auth (email, password_hash) VALUES('test@email.com', '1234');
INSERT INTO auth (email, password_hash) VALUES('testTwo@email.com', '4321');
INSERT INTO auth (email, password_hash) VALUES('testThree@email.com', '4321');
INSERT INTO users (auth_email) VALUES('test@email.com');
INSERT INTO users (auth_email) VALUES('testTwo@email.com');

INSERT INTO topics (name) VALUES 
('Total_Homeless_Population'),
('Percentage_of_Total_Population_Experiencing_Homelessness'),
('LGBT_People_in_Poverty'),
('Percentage_of_LGBT_Population_in_Poverty');

INSERT INTO states (state_name, abrv) VALUES ('alabama', 'AL'),
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
('nebraska', 'NE'),
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


INSERT INTO topics(name)
VALUES ('interesting');


INSERT INTO resources(resource_name, resource_URL, state_abrv, topics_id)
VALUES ('glbtays', 'www.glbtays.org', 'AL', '1');

INSERT INTO populations(state_abrv, total, lgbt, aa, latinx)
VALUES ('AL', 4903185, 117000, 1296162, 264067),
('AK', 731545, 21000, 21898, 49824),
('AZ', 7278717, 242000, 339150, 2192253),
('AR', 3017804, 76000, 453783, 256847),
('CA', 39512223, 1615000, 2237044, 15579652),
('CO', 5758736, 200000, 234828, 1263390),
('CT', 3565287, 111000, 388675, 623293),
('DE', 973764, 34000, 218899, 104290),
('FL', 217477737, 772000, 3246381, 5697240),
('GA', 10617423, 356000, 3320513, 1123457),
('HI', 1415872, 52000, 23417, 138293),
('ID', 1787065, 36000, 15726, 239407),
('IL', 12671821, 426000, 1808271, 2337410),
('IN', 6732219, 229000, 648513, 554191),
('IA', 3155070, 87000, 131972, 215986),
('KS', 2913314, 73000, 168809, 382603),
('KY', 4467673, 117000, 362417, 207854),
('LA', 4648794, 139000, 1464023, 322549),
('ME', 1344212, 53000, 25752, 26609),
('MD', 6045680, 198000, 1820427, 729746),
('MA', 6892503, 296000, 494029, 887685),
('MI', 9986857, 311000, 1376579, 564422),
('MN', 5639632, 175000, 398434, 345640),
('MS', 2976149, 79000, 1084481, 105220),
('MO', 6137428, 180000, 699840, 303068),
('MT', 1068778, 24000, 5484, 45199),
('NE', 1934408, 55000, 96535, 234715),
('NV', 3080156, 127000, 304739, 890257),
('NH', 1359711, 51000, 20127, 59454),
('NJ', 8882190, 288000, 1219770, 20002575),
('NM', 2096829, 72000, 45904, 1010811),
('NY', 19453561, 800000, 2986172, 3948032),
('NC', 10488084, 319000, 2140217, 1118596),
('ND', 762062, 16000, 30067, 33412),
('OH', 11689100, 389000, 1478781, 521308),
('OK', 3956971, 113000, 289961, 471931),
('OR', 42177737, 183000, 82655, 588757),
('PA', 12801989, 416000, 1423169, 1049615),
('RI', 1059361, 38000, 62168, 182101),
('SD', 884659, 20000, 1280531, 38741),
('SC', 5148714, 137000, 17842, 352838),
('TN', 6829174, 182000, 1092948, 479187),
('TX', 28995881, 858000, 3552997, 11441717),
('UT', 3205968, 80000, 40058, 492912),
('VT', 623989, 26000, 9034, 15504),
('VA', 8535519, 257000, 1607581, 908749),
('WA', 7614893, 300000, 307565, 1059213),
('WV', 1792147, 58000, 65813, 34827),
('WI', 5822434, 171000, 376256, 447290),
('WY', 578759, 15000, 5232, 59046);

