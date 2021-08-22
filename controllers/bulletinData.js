import { getBullentinData, returnBulletinText } from "../database/sqlCommunication.js";
import { parseDate } from "../utilities/parseBulletin.js";
//This file handles things related to bulletin data.

//Showing bulletin information to user.
const showBulletinData = async ({ render, params, response }) => {
    const id = params.id;
    const itemList = await getBullentinData(id);

    if (itemList.length < 1) {
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
        const finnishTextItems = await returnBulletinText("Finnish", bulletinData.id);
        const englishTextItems = await returnBulletinText("English", bulletinData.id);
        if (finnishTextItems.length > 0){
            bulletinData.finnishText = finnishTextItems[0].text;
        }
        if (englishTextItems.length > 0){
            bulletinData.englishText = englishTextItems[0].text;
        }
        
        render("bulletinData.eta", bulletinData);
    }
}

export { showBulletinData };