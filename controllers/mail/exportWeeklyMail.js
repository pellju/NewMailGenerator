import { getGreetingForWeeklyLetter, getBulletinsForWeeklyMail, getWeeklyMailData} from "../../database/sqlCommunication.js";
import { parseBulletins, parseDate } from "../../utilities/parseBulletin.js";
import { listingSignups, listItemsForAWeek } from "../../utilities/weekNumberChecking.js";
import { checkIfWeeklymailExists } from "../../utilities/checkingExistance.js";


const exportWeeklymail = async ({ params, render, response }) => {
    const id = params.id;
    const language = params.language;

    const [weeklymailExistance, weeklymailData] = await checkIfWeeklymailExists(id);
    if (!weeklymailExistance){
        response.body = "Weekly mail with such ID does not exist!";
    } else if (language === "finnish" || language === "english") {
        
        const weeklyMail = {
            id: id,
            language: language,
            greeting: "",
            date: weeklymailData.date,
            guildItems: [],
            ayyItems: [],
            otherItems: [],
            bottomCorner: [],
            thisWeek: [],
            nextWeek: [],
            signupsOpenThisWeek: [],
        };

        const checkIfGreetingExists = await getGreetingForWeeklyLetter(weeklyMail.id, weeklyMail.language);
        if (checkIfGreetingExists.length > 0) {
            weeklyMail.greeting = checkIfGreetingExists[0].text;
        } 
        const parsedBulletins = parseBulletins(await getBulletinsForWeeklyMail(id, language));
        
        //Improve this function! (zipWithIndex)
        const filterBulletinsByCertainCategories = (wantedCategory) => {
            const wantedBulletins = []
            let index = 1;
            parsedBulletins.forEach((bulletin) => {
                if (bulletin.category === wantedCategory && bulletin.text !== "-"){
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

        weeklyMail.signupsOpenThisWeek = listingSignups(weeklyMail.date, parsedBulletins);
        const sendingDate = new Date(`${weeklyMail.date}`)
        weeklyMail.thisWeek = listItemsForAWeek(sendingDate, parsedBulletins, 0);
        weeklyMail.nextWeek = listItemsForAWeek(sendingDate, parsedBulletins, 1);

        if (language === "finnish"){
            render("mails/weeklyMailFinnish.eta", weeklyMail);
        } else {
            render("mails/weeklyMailEnglish.eta", weeklyMail);
        }

    } else {
        response.body = "Langauge has to be either English or Finnish!";
    }
}

export { exportWeeklymail };