DROP TABLE IF EXISTS auth CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS states CASCADE;
DROP TABLE IF EXISTS populations CASCADE;
DROP TABLE IF EXISTS topics CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;
DROP TABLE IF EXISTS resources CASCADE; 
DROP TABLE IF EXISTS hate_crime_stats; 

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
  black NUMERIC,
  latinx NUMERIC,
  houseless NUMERIC,
  poverty NUMERIC,
  FOREIGN KEY (state_abrv) REFERENCES states(abrv)
);

CREATE TABLE hate_crime_stats (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  data_year TEXT,
  key TEXT,
  value TEXT
);

INSERT INTO auth (email, password_hash) VALUES('test@email.com', '1234');
INSERT INTO auth (email, password_hash) VALUES('testTwo@email.com', '4321');
INSERT INTO auth (email, password_hash) VALUES('testThree@email.com', '4321');
INSERT INTO users (auth_email) VALUES('test@email.com');
INSERT INTO users (auth_email) VALUES('testTwo@email.com');


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
VALUES ('Homelessness'), ('Food'), ('Poverty'), ('LGBTQIA'), ('Mental Health');

INSERT INTO populations(state_abrv, total, lgbt, black, latinx, houseless, poverty)
VALUES ('AL', 4903185, 117000, 1296162, 264067, 3351, null),
('AK', 731545, 21000, 21898, 49824, 1949, null),
('AZ', 7278717, 242000, 339150, 2192253, 10979, null),
('AR', 3017804, 76000, 453783, 256847, 2366, null),
('CA', 39512223, 1615000, 2237044, 15579652, 161548, 223700),
('CO', 5758736, 200000, 234828, 1263390, 9846, 21500),
('CT', 3565287, 111000, 388675, 623293, 2905, 14500),
('DE', 973764, 34000, 218899, 104290, 1165, 3200),
('FL', 217477737, 772000, 3246381, 5697240, 27487, 7800),
('GA', 10617423, 356000, 3320513, 1123457, 10234, 34300),
('HI', 1415872, 52000, 23417, 138293, 6458, 8600),
('ID', 1787065, 36000, 15726, 239407, 2315, 7900),
('IL', 12671821, 426000, 1808271, 2337410, 101431, 73800),
('IN', 6732219, 229000, 648513, 554191, 5625, 44200),
('IA', 3155070, 87000, 131972, 215986, 2647, 12900),
('KS', 2913314, 73000, 168809, 382603, 2449, 10900),
('KY', 4467673, 117000, 362417, 207854, 4011, 26500),
('LA', 4648794, 139000, 1464023, 322549, 3173, null),
('ME', 1344212, 53000, 25752, 26609, 2097, null),
('MD', 6045680, 198000, 1820427, 729746, 6360, 30900),
('MA', 6892503, 296000, 494029, 887685, 17975, 23300),
('MI', 9986857, 311000, 1376579, 564422, 8638, null),
('MN', 5639632, 175000, 398434, 345640, 7940, 15300),
('MS', 2976149, 79000, 1084481, 105220, 1107, 10600),
('MO', 6137428, 180000, 699840, 303068, 6527, 25600),
('MT', 1068778, 24000, 5484, 45199, 1545, 5600),
('NE', 1934408, 55000, 96535, 234715, 2404, null),
('NV', 3080156, 127000, 304739, 890257, 6900, 16100),
('NH', 1359711, 51000, 20127, 59454, 1675, null),
('NJ', 8882190, 288000, 1219770, 20002575, 9662, null),
('NM', 2096829, 72000, 45904, 1010811, 3333, null),
('NY', 19453561, 800000, 2986172, 3948032, 917271, 105600),
('NC', 10488084, 319000, 2140217, 1118596, 9280, 45800),
('ND', 762062, 16000, 30067, 33412, 541, null),
('OH', 11689100, 389000, 1478781, 521308, 10655, 46600),
('OK', 3956971, 113000, 289961, 471931, 3932, 26800),
('OR', 42177737, 183000, 82655, 588757, 14655, null),
('PA', 12801989, 416000, 1423169, 1049615, 13375, 46200),
('RI', 1059361, 38000, 62168, 182101, 1104, 6100),
('SD', 884659, 20000, 1280531, 38741, 1058, null),
('SC', 5148714, 137000, 17842, 352838, 4287, 17100),
('TN', 6829174, 182000, 1092948, 479187, 7256, null),
('TX', 28995881, 858000, 3552997, 11441717, 27229, 133300),
('UT', 3205968, 80000, 40058, 492912, 3131, null),
('VT', 623989, 26000, 9034, 15504, 1110, 3800),
('VA', 8535519, 257000, 1607581, 908749, 5957, 25400),
('WA', 7614893, 300000, 307565, 1059213, 22923, 39600),
('WV', 1792147, 58000, 65813, 34827, 1341, 5800),
('WI', 5822434, 171000, 376256, 447290, 4515, 18900),
('WY', 578759, 15000, 5232, 59046, 612, 2600);

INSERT INTO resources(resource_name, resource_url, state_abrv, topics_id)
VALUES
('Free Food- by region', 'https://www.freefood.org', 'AZ', '2'),
('Homeless to Independence', 'https://www.homelesstoindependence.org/alabama/alabama-emergency-services/', 'AL', '1'),
('IDENTITY, INC', 'https://identityalaska.org/', 'AK', '1'),
('Alaska Housing Finance Corporation', 'https://www.ahfc.us/', 'AK', '1'),
('DES Utility Assistance ', 'https://des.az.gov/services/basic-needs/shelter-housing/utility-assistance', 'AZ', '1'),
('DES Homeless Services', 'https://des.az.gov/services/basic-needs/shelter-housing/homeless-services', 'AZ', '1'),
('Arkansas Hunger Relief Alliance', 'https://arhungeralliance.org/emergency-resources/', 'AR', '1'),
('Arkansas Department of Human Services: Programs', 'https://humanservices.arkansas.gov/learn-about-programs/', 'AR', '1'),
('Project Roomkey', 'https://www.cdss.ca.gov/inforesources/cdss-programs/housing-programs/project-roomkey', 'CA', '1'),
('CDSS Housing and Homelessness Programs', 'https://www.cdss.ca.gov/inforesources/cdss-programs/housing-programs', 'CA', '1'),
('COVID19 Housing and Rent Help', 'https://covid19.ca.gov/housing-and-homelessness/#People-experiencing-homelessness', 'CA', '1'),
('Colorado Coalition for the Homeless', 'https://www.coloradocoalition.org/gethelp', 'CO', '1'),
('CT Health and Human Services', 'https://portal.ct.gov/Services/Health-and-Human-Services', 'CT', '1'),
('Delaware Health and Social Services', 'https://dhss.delaware.gov/dhss/', 'DE', '1'),
('Florida Coalition to End Homelessness', 'http://fchonline.org/resources/', 'FL', '1'),
('Georgia Department of Community Affairs: Food', 'https://www.dca.ga.gov/safe-affordable-housing/homeless-special-needs-housing/covid-19-resources/food', 'GA', '1'),
('University of Hawaii at Manoa: List of Local Organizations Addressing Homelessness', 'https://guides.library.manoa.hawaii.edu/c.php?g=105635&p=684598', 'HI', '1'),
('Idaho Housing and Finance Association', 'https://www.idahohousing.com/homelessness-services-programs/', 'ID', '1'),
('Jesse Tree', 'https://www.jessetreeidaho.org/', 'ID', '1'),
('Illinois Department of Human Services: Housing, Shelter, and Homelessness Resources', 'https://www.dhs.state.il.us/page.aspx?item=124295', 'IL', '1'),
('Coalition for Homelessness Intervention and Prevention: Handbook of Help', 'http://handbookofhelp.org/', 'IN', '1'),
('Shelter House Iowa', 'https://shelterhouseiowa.org/programs-and-services/', 'IA', '1'),
('Iowa Finance Authority', 'https://www.iowafinance.com/homelessness/', 'IA', '1'),
('KUMC JayDoc Free Clinic: Community Resources', 'https://www.kumc.edu/school-of-medicine/patient-care/student-run-clinics/jaydoc-free-clinic/resources/community-assistance-resources.html', 'KS', '1'),
('KC Footprints for Homeless Veterans', 'https://www.kcfootprints.org/', 'KS', '1'),
('KC Footprints For Homeless Veterans', 'https://www.kcfootprints.org/', 'MO', '1'),
('Sheffield Place', 'https://www.sheffieldplace.org/programs', 'MO', '1'),
('HHCK: Housing Programs', 'https://www.hhck.org/housing-programs', 'KY', '1'),
('Louisiana BOSCO: Housing and Services', 'https://laboscoc.org/housing-and-services/', 'LA', '1'),
('Maine Housing', 'https://www.mainehousing.org/programs-services/homeless/emergency-shelters', 'ME', '1'),
('Maryland Department of Housing and Community Development', 'https://dhcd.maryland.gov/HomelessServices/Pages/default.aspx', 'MD', '1'),
('Massachusetts Department of Housing and Community Development', 'https://www.mass.gov/orgs/housing-and-community-development', 'MA', '1'),
('Project Bread', 'https://www.projectbread.org/get-help', 'MA', '1'),
('811 Project Rental Assistance Program', 'https://www.michigan.gov/mshda/homeless/811/811-project-rental-assistance-pra-program', 'MI', '1'),
('NEMCSA Homeless and Prevention Services', 'https://www.nemcsa.org/services/homeless-prevention-program/', 'MI', '1'),
('Disability Hub', 'https://mn.hb101.org/i/map/homeless_map.htm', 'MN', '1'),
('Mississippi United to End Homelessness', 'https://www.muteh.org/', 'MS', '1'),
('Missouri Department of Social Services', 'https://dss.mo.gov/fsd/esg/', 'MO', '1'),
('St. Louis Homeless Services', 'https://www.stlouis-mo.gov/government/departments/human-services/homeless-services/Homeless-Resources.cfm', 'MO', '1'),
('Poverello Center', 'https://www.thepoverellocenter.org/programs-and-services/', 'MT', '1'),
('Nebraska Department of Health and Human Services: Homeless Assistance', 'https://dhhs.ne.gov/Pages/Homeless-Assistance.aspx#', 'NE', '1'),
('Nevada Homeless Alliance', 'https://nevadahomelessalliance.org/gethelp/', 'NV', '1'),
('NH DHHS: Shelter Services', 'https://www.dhhs.nh.gov/dcbcs/bhhs/shelter.htm', 'NH', '1'),
('NJ Covid-19 Information Hub', 'https://covid19.nj.gov/faqs/nj-information/assistance-and-benefits/how-do-i-apply-for-food-cash-and-health-insurance-assistance-how-are-assistance-programs-adjusting-for-covid-19', 'NJ', '1'),
('Housing New Mexico', 'https://housingnm.org/find-housing/emergency-shelter', 'NM', '1'),
('Supportive Housing Coalition of New Mexico', 'https://www.shcnm.org/communities/', 'NM', '1'),
('NY Coalition for the Homeless', 'https://www.coalitionforthehomeless.org/get-help/', 'NY', '1'),
('NC Coalition to End Homelessness', 'https://www.ncceh.org/lookingforhelp/coordinatedassessment/', 'NC', '1'),
('NC Homeless Education Program', 'https://hepnc.uncg.edu/', 'NC', '1'),
('North Dakota Homeless Coalition', 'https://www.ndhomelesscoalition.org/resources', 'ND', '1'),
('ND DHS: Resources for people who are homeless or at risk of homelessness', 'https://www.nd.gov/dhs/info/covid-19/housing-homelessness.html', 'ND', '1'),
('Coalition on Homelessness and Housing in Ohio', 'http://cohhio.org/housing-information/', 'OH', '1'),
('Ohio Legal Help', 'https://www.ohiolegalhelp.org/', 'OH', '1'),
('Ohio Association of Foodbanks', 'https://ohiofoodbanks.org/foodbanks/', 'OH', '1'),
('Heartline Oaklahoma', 'https://heartlineoklahoma.org/', 'OK', '1'),
('Housing Oregon', 'https://housingoregon.org/resources-for-homelessness-services-covid-19-crisis/#', 'OR', '1'),
('Portland Homeless Family Solutions', 'http://www.pdxhfs.org/housing', 'OR', '1'),
('Interactive Map of Restrooms and Hygiene Stations', 'https://pdx.maps.arcgis.com/apps/webappviewer/index.html?id=3abca53221c64d6a9e35c5c8572a9696', 'OR', '1'),
('Pennsylvania Youth Congress', 'https://payouthcongress.org/resources/emergency-housing/', 'PA', '1'),
('Philadelphia Office of Homeless Services', 'http://philadelphiaofficeofhomelessservices.org/', 'PA', '1'),
('Rhode Island Community Foodbank', 'https://rifoodbank.org/find-food/', 'RI', '1'),
('Rhode Island Coalition to End Homelessness', 'https://www.rihomeless.org/help', 'RI', '1'),
('SCIWAY', 'https://www.sciway.net/org/sc-homeless.html', 'SC', '1'),
('Cornerstone Rescue Mission', 'http://www.cornerstonemission.org/', 'SD', '1'),
('HUD Help Hotlines: South Dakota', 'https://www.hud.gov/states/south_dakota/homeless/hsghelp', 'SD', '1'),
('Tennessee Department of Mental Health and Substance Abuse Services', 'https://www.tn.gov/behavioral-health/housing/additional-programs.html', 'TN', '1'),
('TN State Plan to End Homelessness', 'https://www.tn.gov/content/dam/tn/mentalhealth/documents/TN_Homeless_Resources.pdf', 'TN', '1'),
('TX HHS: Programs & Services', 'https://www.hhs.texas.gov/services/mental-health-substance-use/mental-health-crisis-services/programs-people-who-are-homeless-or-risk-becoming-homeless', 'TX', '1'),
('The Road Home', 'https://theroadhome.org/', 'UT', '1'),
('SLCO Crisis Information & Outreach', 'https://slco.org/homeless-services/resource-directory/crisis-information-and-outreach/', 'UT', '1'),
('VT DCF Benefit Programs', 'https://dcf.vermont.gov/benefits', 'VT', '1'),
('Vermont Coalition to End Homelessness', 'https://helpingtohousevt.org/', 'VT', '1'),
('HUD Homeless Services Providers: VA', 'https://www.hud.gov/states/virginia/homeless/providers', 'VA', '1'),
('WA Department of Commerce', 'https://www.commerce.wa.gov/serving-communities/homelessness/', 'WA', '1'),
('Pierce County: Homeless Programs', 'https://www.piercecountywa.gov/3715/Homeless-Programs', 'WA', '1'),
('Homeless Shelters Directory', 'https://www.homelessshelterdirectory.org/state/west_virginia', 'WV', '1'),
('WV DHHR', 'http://www.wvdhhr.org/bph/tollfree.htm', 'WV', '1'),
('WV DHHR: Family Assistance', 'https://dhhr.wv.gov/bcf/Services/familyassistance/Pages/default.aspx', 'WV', '1'),
('WI Department of Children & Families: Homeless Services', 'https://dcf.wisconsin.gov/homeless', 'WI', '1'),
('WI Department of Children & Families: Resources for Runaway and Homeless Youth', 'https://dcf.wisconsin.gov/map/rhy', 'WI', '1'),
('Wyoming 211: Community Services', 'https://wy211.communityos.org/', 'WY', '1');