BEGIN TRANSACTION;
CREATE TABLE users (
	id	SERIAL,
	username	TEXT,
	password	CHAR ( 60 ),
	PRIMARY KEY(id)
);
CREATE TABLE mail (
	id	SERIAL,
	date	TIMESTAMP,
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
	text	TEXT
);
CREATE TABLE bulletin (
	id	SERIAL,
	mailID	INTEGER,
	date	TIMESTAMP
);
COMMIT;
