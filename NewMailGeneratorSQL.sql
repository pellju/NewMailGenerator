BEGIN TRANSACTION;
CREATE TABLE users (
	id	SERIAL,
	username	TEXT,
	password	CHAR ( 60 ),
	PRIMARY KEY(id)
);
CREATE TABLE mails (
	id	SERIAL,
	day	INTEGER,
	month	INTEGER,
	year	INTEGER,
	PRIMARY KEY(id)
);
CREATE TABLE greeting (
	id	SERIAL,
	mailID	INTEGER,
	language	TEXT,
	text	TEXT,
	PRIMARY KEY(id)
);
CREATE TABLE bulletins (
	id	SERIAL,
	name TEXT,
	category TEXT,
	date	TEXT,
	signupStarts	TEXT,
	signupEnds	TEXT,
	PRIMARY KEY (id)
);
CREATE TABLE bulletinText (
	id	SERIAL,
	bulletinID	INTEGER,
	language	TEXT,
	text	TEXT,
	PRIMARY KEY(id)
);
CREATE TABLE bulletinsForMails (
	id	SERIAL,
	bulletinID	INTEGER,
	mailID	INTEGER,
	mailLanguage	TEXT,
	PRIMARY KEY(id)
);

COMMIT;
