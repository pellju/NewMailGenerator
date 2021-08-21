import { getBullentinData, returnBulletinText } from "../database/sqlCommunication.js";
import { parseDate } from "../utilities/parseBulletin.js";
//This file handles things related to bulletin data.

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
            signupStarts: parseDate(item.signupstarts),
            signupEnds: parseDate(item.signupends),
            finnishText: "",
            englishText: "",
        };
        console.log("testi2");
        const finnishTextItems = await returnBulletinText("Finnish", bulletinData.id);
        const englishTextItems = await returnBulletinText("English", bulletinData.id);
        console.log("testi1");
        if (finnishTextItems.length > 0){
            bulletinData.finnishText = finnishTextItems[0].text;
        }
        if (englishTextItems.length > 0){
            bulletinData.englishText = englishTextItems[0].text;
        }
        
        console.log("testi");
        render("bulletinData.eta", bulletinData);
    }
}

export { showBulletinData };