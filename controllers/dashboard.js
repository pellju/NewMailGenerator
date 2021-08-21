import { createNewMail, getBulletins, getMails, getLastBulletins } from "../database/sqlCommunication.js";
import { parseBulletins } from "../utilities/parseBulletin.js";
//This file contains functions related to dashboard
//Dashboard: So far contains existing weekly mails. Also possibility to add a new one.

//showDashboard is intended to list existing weekly mails
const showDashboard = async({ render }) => {
    const data = {
        weeklyMails: await getMails(),
        lastItems: []
    }
    const lastBulletins = parseBulletins(await getLastBulletins());
    if (lastBulletins.length > 0){
        data.lastItems = lastBulletins;
    }
    render("dashboard.eta", data);
}

const addNewWeeklyMail = async ({ response, request }) => {
    const body = request.body();
    const params = await body.value;
    const dateFromParams = params.get("weeklyMailDate"); //string
    const dateValues = dateFromParams.split("-");
    
    const year = dateValues[0];
    const month = dateValues[1];
    const day = dateValues[2];
    
    await createNewMail(year, month, day);
    response.redirect("/dashboard");
}

/*const deleteWeeklyMail = async ({ response, request, params }) => { //Not implemented yet

}*/

export { showDashboard, addNewWeeklyMail };