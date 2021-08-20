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
const createNewMail = async (year, month, day) => {
    await queryDatabase("INSERT INTO mails (day, month, year) VALUES ($1, $2, $3);", day, month, year);
};

//Getting bulletins, the usage is not yet clear.
const getBulletins = async () => {

};

//Gets last 15 bulletins (name, id, date)
const getLastBulletins = async () => {
    const result = await queryDatabase("SELECT * FROM bulletin ORDER BY id DESC LIMIT 15;");
    console.log(result);
    return result.rows;
};

export { amountOfUsers, amountOfUsersWithGivenUsername, registration, getUserData, getMails, getBulletins, createNewMail, getLastBulletins };