import { getBulletins, addBulletin, removeBulletinFromDatabase } from "../../database/sqlCommunication.js";
import { parseBulletins, parseDate } from "../../utilities/parseBulletin.js";
import { checkIfBulletinExists } from "../../utilities/checkingExistance.js";
//File contains items related to bulletins, for example showing them and adding new ones. 

//Listing all bulletins.
const listAllBulletins = async ({ render }) => {
    const data = {
        items: parseBulletins(await getBulletins()),
    };
    render("bulletins/bulletins.eta", data);
}

const validateCategory = (category) => {
    const validCategories = ["Kilta", "AYY & Aalto", "Muut", "Pohjanurkkaus"];
    if (validCategories.includes(category)){
        return true;
    } else {
        return false;
    }
}

//Creating a new bulletin.
const addNewBulletin = async ({ request, response }) => {
    const body = request.body();
    const params = await body.value;
    const finnishName = params.get("finnishName");
    const englishName = params.get("englishName");
    const date = params.get("date");
    const category = params.get("category");
    let signupStarts = params.get("signupStartDate");
    let signupEnds = params.get("signupEndDate");
    
    if (signupStarts === null || signupEnds === null) { //If either one is empty --> define both as empty
        signupStarts = "";
        signupEnds = "";
    }
    
    //The following code needs to cleaned and re-written properly. Improve this.
    if (validateCategory(category)){
        if (signupEnds !== "" && signupStarts !== ""){
            const status = compareTwoTimestamps(signupStarts, signupEnds);
            if (!status){
                response.body = "Signup start date can't be later than the date signup ends.";
            } else {
                await addBulletin(finnishName, englishName, category, date, signupStarts, signupEnds);
                response.redirect("/bulletins");
            }
        } else {
            await addBulletin(finnishName, englishName, category, date, signupStarts, signupEnds);
            response.redirect("/bulletins");
        }
    } else {
        response.body = "Please choose a proper category!";
    }
};

//If timestamp1 is after timestamp2, returns false.
const compareTwoTimestamps = (timestamp1, timestamp2) => {
    const ts1 = parseDate(timestamp1);
    const ts2 = parseDate(timestamp2);
    const date1 = new Date(ts1.year, ts1.month, ts1.day);
    const date2 = new Date(ts2.year, ts2.month, ts2.day);

    const result = date2 >= date1;
    return result;
};

//Removing bulletin from database
const deleteBulletin = async ({ response, params }) => {
    const bulletinID = params.id;
    const [existance, bulletinData] = await checkIfBulletinExists(bulletinID);
    if (existance){
        await removeBulletinFromDatabase(bulletinID);
    }
    response.redirect(`/bulletins/`);
};

export { listAllBulletins, addNewBulletin, deleteBulletin, validateCategory, compareTwoTimestamps };