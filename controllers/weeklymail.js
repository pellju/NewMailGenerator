import { getWeeklyMailData, getBulletinsForWeeklyMail } from "../database/sqlCommunication.js";
import { parseBulletins } from "../utilities/parseBulletin.js";

const showWeeklyMailInfo =  async ({params, response, render}) => {
    const id = params.id;
    const checkIfWeeklyMailExists = await getWeeklyMailData(id);
    if (checkIfWeeklyMailExists.length < 1) {
        response.body = "Weeklymail with such ID not found.";
    } else {
        const weeklyMailData = {
            id: checkIfWeeklyMailExists[0].id,
            day: checkIfWeeklyMailExists[0].day,
            month: checkIfWeeklyMailExists[0].month,
            year: checkIfWeeklyMailExists[0].year,
            bulletins: [],
            finnishGreeting: "",
            englishGreeting: "",
        }

        const bulletinsForTheGivenWeeklyMail = await getBulletinsForWeeklyMail(weeklyMailData.id);
        if (bulletinsForTheGivenWeeklyMail.length > 0) {
            weeklyMailData.bulletins = parseBulletins(bulletinsForTheGivenWeeklyMail);
        }

        render("weeklymail.eta", weeklyMailData);
    }
}

export { showWeeklyMailInfo };