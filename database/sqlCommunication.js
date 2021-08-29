import { queryDatabase } from "./connection.js";

//This file contains the functions which are used for SQL-querying.
 
//Listing the amount of all users. Used for checking if there is a person already registered.
const amountOfUsers = async () => {
    const result = await queryDatabase("SELECT COUNT(username) FROM users");
    return Number(result.rows[0].count); //Valid because returns 0 or 1 or whatever the amount of users is.
};

//Listing amount of users with given username. Used for registration
const amountOfUsersWithGivenUsername = async (username) => {
    const result = await queryDatabase("SELECT COUNT(username) FROM users WHERE username=$1;",username);
    return Number(result.rows[0].count);
};

//Registration of the user.
//This function is just for inserting the data into database.
//Checks have been done already.
const registration = async (username, password) => {
    await queryDatabase("INSERT INTO users (username, password) VALUES ($1, $2);", username, password);
};

//The following function gets the "userdata" (id, username, HASHED password) for given username.
const getUserData = async (username) => {
    const result = await queryDatabase("SELECT * FROM users WHERE username = $1;", username);
    return result.rows;
}

//This function returns current mails from the database.
const getMails = async () => {
    const result = await queryDatabase("SELECT * FROM mails;");
    let mails = []
    if (result.rows.length > 0){
        mails = result.rows;
    }
    return mails;
};

//Creating a new mail.
const createNewMail = async (date) => {
    await queryDatabase("INSERT INTO mails (date) VALUES ($1);", date);
};

//Getting bulletins, the usage is not yet clear.
const getBulletins = async () => {
    const result = await queryDatabase("SELECT * FROM bulletins ORDER BY id DESC;");
    return result.rows;
};

//Gets last 15 bulletins (name, id, date).
const getLastBulletins = async () => {
    const result = await queryDatabase("SELECT * FROM bulletins ORDER BY id DESC LIMIT 15;");
    return result.rows;
};

//Adding a bulletin to database.
const addBulletin = async (finnishName, englishName, category, date, signupStarts, signupEnds) => {
    await queryDatabase("INSERT INTO bulletins (finnishName, englishName, category, date, signupStarts, signupEnds) VALUES ($1, $2, $3, $4, $5, $6);", finnishName, englishName, category, date, signupStarts, signupEnds);
};

//Returns data for the given bulletin.
const getBulletinData = async (id) => {
    const result = await queryDatabase("SELECT * FROM bulletins WHERE id = $1;", id);
    return result.rows;
}

//Returns the text of an bulletin in the given language (if exists).
const returnBulletinText = async (language, bulletinID) => {
    const result = await queryDatabase("SELECT * FROM bulletinText WHERE language=$1 AND bulletinID=$2;", language, bulletinID);
    return result.rows;
};

//Adding bulletin text for a given bulletin.
const addBulletinTextToDatabse = async (bulletinID, language, text) => {
    await queryDatabase("INSERT INTO bulletinText (bulletinID, language, text) VALUES ($1, $2, $3);", bulletinID, language, text);
}

//In case text already exists -> updating it.
const updateBulletinText = async (bulletinID, language, text) => {
    await queryDatabase("UPDATE bulletinText SET text=$1 WHERE bulletinID=$2 AND language=$3;", text, bulletinID, language);
};

//Get data from the given weeklyMailID.
const getWeeklyMailData = async (id) => {
    const result = await queryDatabase("SELECT * FROM mails WHERE id=$1;", id);
    return result.rows;
};

//Getting the basic information from bulletins included to weekly mail.
const getBulletinsForWeeklyMail = async (id, language) => {
    const result = await queryDatabase("SELECT * FROM bulletinsForMails JOIN bulletins ON bulletinsForMails.bulletinID = bulletins.id JOIN bulletinText ON bulletinText.bulletinID = bulletins.id WHERE bulletinsForMails.mailID=$1 AND bulletinText.language=$2 ORDER BY bulletins.date;", id ,language);
    return result.rows;
};

//Getting greeting if exists.
const getGreetingForWeeklyLetter = async (id, language) => {
    const result = await queryDatabase("SELECT * FROM greetings WHERE mailID=$1 AND language=$2;", id, language);
    return result.rows;
};

//Updates existing greeting.
const updateExistingGreeting = async (id, language, text) => {
    await queryDatabase("UPDATE greetings SET text=$1 WHERE mailID=$2 AND language=$3;", text, id, language);
};

//Adds new greeting to a weekly mail.
const createNewGreeting = async (id, language, text) => {
    await queryDatabase("INSERT INTO greetings (mailID, language, text) VALUES ($1, $2, $3);", id, language, text);
};

//Adds bulletin to weekly mail.
const insertBulletinIntoWeeklyMail = async (mailID, bulletinID, language) => {
    await queryDatabase("INSERT INTO bulletinsForMails (bulletinID, mailID, mailLanguage) VALUES ($1, $2, $3);", bulletinID, mailID, language);
};

//Removes bulletin from database.
const removeBulletinFromDatabase = async (bulletinID) => {
    await queryDatabase("DELETE FROM bulletinsForMails WHERE bulletinID=$1;", bulletinID);
    await queryDatabase("DELETE FROM bulletinText WHERE bulletinID=$1;", bulletinID);
    await queryDatabase("DELETE FROM bulletins WHERE id=$1;", bulletinID);
};

//Removes bulletin from weekly mail.
const deleteBulletinFromWeeklymail = async (bulletinID, mailID, language) => {
    await queryDatabase("DELETE FROM bulletinsForMails WHERE bulletinID=$1 AND mailID=$2 AND mailLanguage=$3;", bulletinID, mailID, language);
};

//Deleting weekly mail from database.
const deleteWeeklyMail = async (mailID) => {
    await queryDatabase("DELETE FROM bulletinsForMails WHERE mailID=$1;", mailID);
    await queryDatabase("DELETE FROM greetings WHERE mailID=$1;", mailID);
    await queryDatabase("DELETE FROM mails WHERE id=$1;", mailID);
};

export { amountOfUsers, amountOfUsersWithGivenUsername, registration, getBulletinsForWeeklyMail, getUserData, getMails, getWeeklyMailData, getBulletins, 
        createNewMail, getLastBulletins, addBulletin, getBulletinData, returnBulletinText, addBulletinTextToDatabse, updateBulletinText, getGreetingForWeeklyLetter,
        updateExistingGreeting, createNewGreeting, insertBulletinIntoWeeklyMail, removeBulletinFromDatabase, deleteBulletinFromWeeklymail, deleteWeeklyMail };