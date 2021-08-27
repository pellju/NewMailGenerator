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
            weeklyMail.greeting = String(checkIfGreetingExists[0].text);
            console.log(weeklyMail.greeting);
        } 
        const parsedBulletins = parseBulletins(await getBulletinsForWeeklyMail(id));
        
        //Improve this function!
        const filterBulletinsByCertainCategories = (wantedCategory) => {
            const wantedBulletins = []
            let index = 1;
            parsedBulletins.forEach((bulletin) => {
                if (bulletin.category === wantedCategory && bulletin.text !== "-"){
                    //bulletin.text = String.raw(bulletin.text);
                    wantedBulletins.push(bulletin);
                    bulletin.index = index;
                    index++;
                    console.log(bulletin);
                }
            })
            return wantedBulletins;
        }

        weeklyMail.guildItems = filterBulletinsByCertainCategories("Kilta");
        weeklyMail.ayyItems = filterBulletinsByCertainCategories("AYY & Aalto");
        weeklyMail.otherItems = filterBulletinsByCertainCategories("Muut");
        weeklyMail.bottomCorner = filterBulletinsByCertainCategories("Pohjanurkkaus");
        //console.log(weeklyMail.guildItems);

        if (language === "finnish"){
            render("weeklyMailFinnish.eta", weeklyMail);
        } else {
            render("weeklyMailEnglish.eta", weeklyMail);
        }

    } else {
        response.body = "Langauge has to be either English or Finnish!";
    }
}

export { exportWeeklymail };