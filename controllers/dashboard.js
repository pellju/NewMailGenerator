import { createNewMail, getBulletins, getMails } from "../database/sqlCommunication.js";
//This file contains functions related to dashboard
//Dashboard: So far contains existing weekly mails. Also possibility to add a new one.

//showDashboard is intended to list existing weekly mails
const showDashboard = async({ render }) => {
    const data = {
        weeklyMails: await getMails(),
    }
    render("dashboard.eta", data);
}

export { showDashboard };