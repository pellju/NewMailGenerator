import { getGreetingForWeeklyLetter, getBulletinsForWeeklyMail, getWeeklyMailData, getBulletinData } from "../database/sqlCommunication.js";
import { parseBulletins } from "../utilities/parseBulletin.js";

const exportWeeklymail = async ({ params, render, response }) => {
    const id = params.id;
    const language = params.language;

    const checkIfWeeklyMailExists = await getWeeklyMailData(id);
    if (checkIfWeeklyMailExists.length === 0){
        response.body = "Weekly mail with such ID does not exist!";
    } else if (language === "finnish" || language === "english") {
        const mail = checkIfWeeklyMailExists[0];
        const weeklyMail = {
            id: id,
            language: language,
            greeting: "",
            day: mail.day,
            month: mail.month,
            year: mail.year,
            guildItems: [],
            ayyItems: [],
            otherItems: [],
            bottomCorner: [],
        };

        const checkIfGreetingExists = await getGreetingForWeeklyLetter(weeklyMail.id, weeklyMail.language);
        if (checkIfGreetingExists.length > 0) {
            weeklyMail.greeting = checkIfGreetingExists[0].text;
        } 
        const parsedBulletins = parseBulletins(await getBulletinsForWeeklyMail(id));

        const filterBulletinsByCertainCategories = (bulletin, wantedCategory) => {
            return bulletin.category === wantedCategory;
        };

        weeklyMail.guildItems = filterBulletinsByCertainCategories(parsedBulletins, "Kilta");
        weeklyMail.ayyItems = filterBulletinsByCertainCategories(parsedBulletins, "AYY & Aalto");
        weeklyMail.otherItems = filterBulletinsByCertainCategories(parsedBulletins, "Muut");
        weeklyMail.bottomCorner = filterBulletinsByCertainCategories(parsedBulletins, "Pohjanurkkaus");

        console.log(weeklyMail.guildItems);

        if (language === "finnish"){
            render("specialWeeklyMailFinnish.eta", weeklyMail);
        } else {
            render("specialWeeklyMailEnglish.eta", weeklyMail);
        }

    } else {
        response.body = "Langauge has to be either English or Finnish!";
    }
}

export { exportWeeklymail };