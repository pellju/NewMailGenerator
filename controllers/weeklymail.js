import { getWeeklyMailData, getBulletinsForWeeklyMail, getGreetingForWeeklyLetter, updateExistingGreeting, createNewGreeting } from "../database/sqlCommunication.js";
import { parseBulletins } from "../utilities/parseBulletin.js";

const showWeeklyMailInfo =  async ({params, response, render}) => {
    const id = params.id;
    const language = params.language; 
    const checkIfWeeklyMailExists = await getWeeklyMailData(id);
    if (checkIfWeeklyMailExists.length < 1) {
        response.body = "Weeklymail with such ID not found.";
    } else if (language === "finnish" || language === "english") {
        const weeklyMailData = {
            id: checkIfWeeklyMailExists[0].id,
            day: checkIfWeeklyMailExists[0].day,
            month: checkIfWeeklyMailExists[0].month,
            year: checkIfWeeklyMailExists[0].year,
            language: language,
            bulletins: [],
            greeting: "",
        }

        const bulletinsForTheGivenWeeklyMail = await getBulletinsForWeeklyMail(weeklyMailData.id);
        const checkExistingGreeting = await getGreetingForWeeklyLetter(weeklyMailData.id, weeklyMailData.language);
        if (bulletinsForTheGivenWeeklyMail.length > 0) {
            weeklyMailData.bulletins = parseBulletins(bulletinsForTheGivenWeeklyMail);
        }
        if (checkExistingGreeting.length > 0) {
            weeklyMailData.greeting = checkExistingGreeting[0].text;
        }

        render("weeklymail.eta", weeklyMailData);
    } else {
        response.body = "Language is either finnish or english.";
    }
}

const addGreetingsToWeeklyMail = async ({ params, request, response }) => {
    const id = params.id;
    const language = params.language;
    const body = request.body();
    const bodyParams = await body.value;
    const newGreeting = bodyParams.get("greeting");

    const checkIfWeeklyMailExists = await getWeeklyMailData(id);
    if (checkIfWeeklyMailExists.length < 1) {
        response.body = "No email with such ID exists!";
    } else if (language === "finnish" || language === "english"){
        
        const checkExistingGreeting = await getGreetingForWeeklyLetter(id, language);
        if (checkExistingGreeting.length > 0) { //Greeting already exists, UPDATE >>.
            await updateExistingGreeting(id, language, newGreeting);
        } else { //Greeting does not already exist, INSERT INTO >>.
            await createNewGreeting(id, language, newGreeting);
        }
        response.redirect(`/dashboard/${id}/${language}`);
    } else {
        response.body = "Language has to be Finnish or English!";
    }
};

const addBulletinToWeeklyMail = async () => {

};

export { showWeeklyMailInfo, addGreetingsToWeeklyMail, addBulletinToWeeklyMail };