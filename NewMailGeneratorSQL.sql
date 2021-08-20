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
CREATE TABLE bulletinText (
	id	SERIAL,
	bulletinID	INTEGER,
	language	TEXT,
	text	TEXT,
	PRIMARY KEY(id)
);
CREATE TABLE bulletin (
	id	SERIAL,
	name TEXT,
	mailID	INTEGER,
	day	INTEGER,
	month	INTEGER,
	year	INTEGER,
	PRIMARY KEY (id)
);
COMMIT;
