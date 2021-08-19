import { amountOfUsers, amountOfUsersWithGivenUsername, registration } from "../database/sqlCommunication.js";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";
import { minLength, required, validate } from "https://deno.land/x/validasaur@v0.15.0/mod.ts";
//This file is used for registration. By default only one person allowed.
//TODO: Change the amount to variable! 

//Adding some rules for registration.
const validationRules = {
    username: [required, minLength(1)],
    password: [required, minLength(8)],
}

//Showing the registration form for users.
const registrationPage = async({ response, render }) => {
    if (await amountOfUsers() < 2){
        const data = {
            username: "",
            password: "",
            errors: {},
        };

        render("registration.eta", data);
    } else {
        response.body = "Already registered.";
    }
};

//Reigstration of an user by the details sent to server.
const registrationFunction = async({ response, render, request }) => {
    const body = request.body();
    const params = await body.value;

    const data = {
        username: params.get("username"),
        password: params.get("password"),
        errors: {}
    };

    const amountOfCurrentUsers = await amountOfUsers();
    const [passes, errors] = await validate(data, validationRules);

    if (passes) {
        if (await amountOfUsersWithGivenUsername(data.username) === 0 && amountOfCurrentUsers < 2) {
            const hashedPassword = await bcrypt.hash(data.password);
            await registration(data.username, hashedPassword);
            response.redirect("/");
        } else {
            render("registration.eta", data);
        }
    } else {
        data.errors = errors;
        render("registration.eta", data);
    }
}

export { registrationPage, registrationFunction };