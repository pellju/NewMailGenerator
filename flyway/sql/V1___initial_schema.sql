BEGIN TRANSACTION;
CREATE TABLE users (
	id	SERIAL,
	username	TEXT,
	password	CHAR ( 60 ),
	PRIMARY KEY(id)
);
CREATE TABLE mails (
	id	SERIAL,
	date	TEXT,
	PRIMARY KEY(id)
);
CREATE TABLE greetings (
	id	SERIAL,
	mailID	INTEGER REFERENCES mails(id),
	language	TEXT,
	text	TEXT,
	PRIMARY KEY(id)
);
CREATE TABLE bulletins (
	id	SERIAL,
	finnishName TEXT,
	englishName TEXT,
	category TEXT,
	date	TEXT,
	signupStarts	TEXT,
	signupEnds	TEXT,
	PRIMARY KEY (id)
);
CREATE TABLE bulletinText (
	id	SERIAL,
	bulletinID	INTEGER REFERENCES bulletins(id),
	language	TEXT,
	text	TEXT,
	PRIMARY KEY(id)
);
CREATE TABLE bulletinsForMails (
	id	SERIAL,
	bulletinID	INTEGER REFERENCES bulletins(id),
	mailID	INTEGER REFERENCES mails(id),
	mailLanguage	TEXT,
	PRIMARY KEY(id)
);

COMMIT;