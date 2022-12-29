import { getUserData } from "../database/sqlCommunication.js";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";
//This file is about logging in the user.

//Showing the login form.
const showLogin = async ({render}) => {
    const data = {
        username: "",
        password: "",
    }

    render ("loginpage.eta", data);
};

//Logging in the user. Using cookies as authentication method.
const sendLogin = async ({ render, request, response, state}) => {
    const body = request.body();
    const params = await body.value;

    const data = {
        username: params.get("username"),
        password: params.get("password"),
    }

    const userFromDatabase = await getUserData(data.username);
    if (userFromDatabase.length > 0) { //User with such username exists
        const passwordMatching = await bcrypt.compare(data.password, userFromDatabase[0].password);
        if (passwordMatching){
            await state.session.set("Authenticated", true);
            response.redirect("/dashboard");
        } else {
            response.redirect("/login");
        }
    } else { //User does not exist
        render("loginpage.eta", data);
    }
};

export { showLogin, sendLogin };