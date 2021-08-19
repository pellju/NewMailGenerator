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

//Login checking using the given username.

export { amountOfUsers, amountOfUsersWithGivenUsername, registration };