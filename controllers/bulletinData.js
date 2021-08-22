import { getBullentinData, returnBulletinText, addBulletinTextToDatabse, updateBulletinText } from "../database/sqlCommunication.js";
import { parseDate } from "../utilities/parseBulletin.js";
//This file handles things related to bulletin data.

//Showing bulletin information to user.
const showBulletinData = async ({ render, params, response }) => {
    const id = params.id;
    const itemList = await getBullentinData(id);

    if (itemList.length < 1) { //Checking if a bulletin with the given ID exists
        response.body = "No such bulletinID!";
    } else {
        const item = itemList[0];
        
        const bulletinData = {
            id: item.id,
            name: item.name,
            date: parseDate(item.date),
            signupStarts: "",
            signupEnds: "",
            finnishText: "",
            englishText: "",
        };

        //Checking if signup starting and ending dates have been added.
        if (item.signupends !== "" && item.signupstarts !== ""){
            bulletinData.signupStarts = parseDate(item.signupstarts);
            bulletinData.signupEnds = parseDate(item.signupends);
        }

        //Getting and checking if text items were added successfully.
        const finnishTextItems = await returnBulletinText("finnish", bulletinData.id);
        const englishTextItems = await returnBulletinText("english", bulletinData.id);
        if (finnishTextItems.length > 0){
            bulletinData.finnishText = finnishTextItems[0].text;
        }
        if (englishTextItems.length > 0){
            bulletinData.englishText = englishTextItems[0].text;
        }
        
        render("bulletinData.eta", bulletinData);
    }
}

const addBulletinText = async ({ request, response, params }) => {
    const body = request.body();
    const bodyParams = await body.value;
    const id = params.id;
    const language = params.language;
    let text = "";
    const itemList = await getBullentinData(id);
    
    //Checking if bulletin with the given ID exists
    if (itemList.length < 0 ) {
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

export { showBulletinData, addBulletinText };