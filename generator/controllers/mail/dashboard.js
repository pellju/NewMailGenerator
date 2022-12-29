import { createNewMail, getMails, getLastBulletins } from "../../database/sqlCommunication.js";
import { parseBulletins, parseDate } from "../../utilities/parseBulletin.js";
//This file contains functions related to dashboard
//Dashboard: So far contains existing weekly mails. Also possibility to add a new one.

//showDashboard is intended to list existing weekly mails
const showDashboard = async({ render }) => {
    const mails = await getMails();
    mails.forEach((mail) => {
        mail.date = parseDate(mail.date);
    })
    
    const data = {
        weeklyMails: mails,
        lastItems: parseBulletins(await getLastBulletins()),
    }
    render("mails/dashboard.eta", data);
}

const addNewWeeklyMail = async ({ response, request }) => {
    const body = request.body();
    const params = await body.value;
    const dateFromParams = params.get("weeklyMailDate"); //string, yyyy-mm-dd    
    await createNewMail(dateFromParams);
    response.redirect("/dashboard");
}

export { showDashboard, addNewWeeklyMail };