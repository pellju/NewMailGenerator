import { getBulletins, addBulletin } from "../database/sqlCommunication.js";
import { parseBulletins, parseDate } from "../utilities/parseBulletin.js";
//File contains items related to bulletins, for example showing them and adding new ones. 

//Listing all bulletins.
const listAllBulletins = async ({ render }) => {
    const data = {
        items: parseBulletins(await getBulletins()),
    };
    render("bulletins.eta", data);
}

//Creating a new bulletin.
const addNewBulletin = async ({ request, response }) => {
    const body = request.body();
    const params = await body.value;
    const name = params.get("name");
    const date = params.get("date");
    let signupStarts = params.get("signupStartDate");
    let signupEnds = params.get("signupEndDate");
    
    if (signupStarts === null || signupEnds === null) { //If either one is empty --> define both as empty
        signupStarts = "";
        signupEnds = "";
    }
    
    //The following code needs to cleaned and re-written properly. 
    if (signupEnds !== "" && signupStarts !== ""){
        const status = compareTwoTimestamps(signupStarts, signupEnds);
        if (!status){
            response.body = "Signup start date can't be later than the date signup ends.";
        } else {
            await addBulletin(name, date, signupStarts, signupEnds);
            response.redirect("/bulletins");
        }
    } else {
        await addBulletin(name, date, signupStarts, signupEnds);
        response.redirect("/bulletins");
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

export { listAllBulletins, addNewBulletin };