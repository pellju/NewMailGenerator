import { returnBulletinText, addBulletinTextToDatabse, updateBulletinText, updateBulletinDetails } from "../../database/sqlCommunication.js";
import { parseDate } from "../../utilities/parseBulletin.js";
import { checkIfBulletinExists } from "../../utilities/checkingExistance.js";
import { compareTwoTimestamps, validateCategory } from "./bulletins.js";

//This file handles things related to bulletin data.

//Showing bulletin information to user.
const showBulletinData = async ({ render, params, response }) => {
    const id = params.id;
    const [existance, data] = await checkIfBulletinExists(id);

    if (!existance) {
        response.body = "No such bulletinID!";
    } else {        
        const bulletinData = {
            id: id,
            finnishname: data.finnishname,
            englishname: data.englishname,
            category: data.category,
            date: parseDate(data.date),
            signupStarts: "",
            signupEnds: "",
            finnishText: "",
            englishText: "",
        };

        //Checking if signup starting and ending dates have been added.
        if (data.signupends !== "" && data.signupstarts !== ""){
            bulletinData.signupStarts = parseDate(data.signupstarts);
            bulletinData.signupEnds = parseDate(data.signupends);
        }

        //Getting and checking if text items exists for this bulletin.
        const finnishTextItems = await returnBulletinText("finnish", bulletinData.id);
        const englishTextItems = await returnBulletinText("english", bulletinData.id);
        if (finnishTextItems.length > 0){
            bulletinData.finnishText = finnishTextItems[0].text;
        }
        if (englishTextItems.length > 0){
            bulletinData.englishText = englishTextItems[0].text;
        }
        
        render("bulletins/bulletinData.eta", bulletinData);
    }
}

//Adding a new/updating a bulletin to database.
const addBulletinText = async ({ request, response, params }) => {
    const body = request.body();
    const bodyParams = await body.value;
    const id = params.id;
    const language = params.language;
    let text = "";
    const [existance, data] = await checkIfBulletinExists(id);
    
    //Checking if bulletin with the given ID exists
    if (!existance) {
        response.body = "No such bulletin!";
    } else if (language === "finnish" || language === "english") {

        if (language === "finnish"){ //language === Finnish
            text = bodyParams.get("finnishText");
        } else { //language === English
            text = bodyParams.get("englishText");
        }

        //Checking if text already exists with the given bulletin
        const existingText = await returnBulletinText(language, id);
        if (existingText.length === 0) {
            await addBulletinTextToDatabse(id, language, text);
        } else { //If there is, updating the existing.
            await updateBulletinText(id, language, text);
        }
        response.redirect(`/bulletins/${id}`);
    } else {
        response.body = "Please use Finnish or English!";
    }
};

const updateBulletinInfo = async ({ request, response, params }) => {
    const body = request.body();
    const bodyParams = await body.value;
    const finnishname = bodyParams.get("finnishName");
    const englishname = bodyParams.get("englishName");
    const category = bodyParams.get("category");
    const date = bodyParams.get("date");
    const signupStarts = bodyParams.get("signupStartDate");
    const signupEnds = bodyParams.get("signupEndDate");
    const id = params.id;
    
    if (validateCategory(category)) {
        if (signupStarts != "" && signupEnds != "") {
            if (!compareTwoTimestamps(signupStarts, signupEnds)){
                response.body = "Signup cannot start after closing!";
            } else {
                await updateBulletinDetails(id, finnishname, englishname, category, date, signupStarts, signupEnds);
                response.redirect("/bulletins");
            }
        } else {
            await updateBulletinDetails(id, finnishname, englishname, category, date, signupStarts, signupEnds);
            response.redirect("/bulletins");
        }
    } else {
        response.body = "Category is invalid!";
    }
};

export { showBulletinData, addBulletinText, updateBulletinInfo };