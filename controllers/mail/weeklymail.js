import { getBulletinsForWeeklyMail, getGreetingForWeeklyLetter, updateExistingGreeting, 
    createNewGreeting, insertBulletinIntoWeeklyMail, deleteBulletinFromWeeklymail, deleteWeeklyMail } from "../../database/sqlCommunication.js";
import { parseBulletins, parseDate } from "../../utilities/parseBulletin.js";
import { checkIfBulletinExists, checkIfWeeklymailExists } from "../../utilities/checkingExistance.js";

const showWeeklyMailInfo =  async ({params, response, render}) => {
    const id = params.id;
    const language = params.language; 
    
    const [existance, data] = await checkIfWeeklymailExists(id);
    if (!existance) {
        response.body = "Weeklymail with such ID not found.";
    } else if (language === "finnish" || language === "english") {
        
        const weeklyMailData = {
            id: data.id,
            date: parseDate(data.date),
            language: language,
            bulletins: parseBulletins(await getBulletinsForWeeklyMail(id, language)),
            greeting: "",
        }

        const checkExistingGreeting = await getGreetingForWeeklyLetter(weeklyMailData.id, weeklyMailData.language);
        if (checkExistingGreeting.length > 0) {
            weeklyMailData.greeting = checkExistingGreeting[0].text;
        }

        render("mails/weeklymail.eta", weeklyMailData);
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

    const [existance, data] = await checkIfWeeklymailExists(id);
    if (!existance) {
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

const addBulletinToWeeklyMail = async ({ params, request, response }) => {
    const mailID = params.id;
    const body = request.body();
    const bodyParams = await body.value;
    const bulletinID = bodyParams.get("id");
    const language = params.language;

    const [weeklymailExistance, weeklymailData] = await checkIfWeeklymailExists(mailID);
    const [bulletinExistance, bulletinData] = await checkIfBulletinExists(bulletinID);
    if (!bulletinExistance) {
        response.body = "Bulletin does not exists with the given ID.";
    } else if (!weeklymailExistance) {
        response.body = "Weekly mail with the given ID does not exists";
    } else if (language === "finnish" || language === "english" ) {
        await insertBulletinIntoWeeklyMail(mailID, bulletinID, language);
        response.redirect(`/dashboard/${mailID}/${language}`);
    } else {
        response.body = "Language has to be English or Finnish!";
    }
};

const removeBulletinFromWeeklymail = async ({ response, params }) => {
    const weeklymailID = params.id;
    const language = params.language;
    const bulletinID = params.bulletin;
    console.log(bulletinID);
    const [weeklymailExistance, weeklymailData] = await checkIfWeeklymailExists(weeklymailID);
    const [bulletinExistance, bulletinData] = await checkIfBulletinExists(bulletinID);
    console.log(bulletinExistance);
    if (weeklymailExistance && bulletinExistance && (language === "finnish" || language === "english")){
        await deleteBulletinFromWeeklymail(bulletinID, weeklymailID, language);
        response.redirect(`/dashboard/${weeklymailID}/${language}`);
    } else {
        response.body = "No such bulletin or weeklymail!";
    }
};

const removeWeeklyMail = async ({ response, params }) => {
    const weeklymailID = params.id;
    const [weeklymailExistance, weeklymailData] = await checkIfWeeklymailExists(weeklymailID);
    if (weeklymailExistance){
        await deleteWeeklyMail(weeklymailID);
        response.redirect("/dashboard");
    } else {
        response.body = "Weeklymail with such ID not found.";
    }

}

export { showWeeklyMailInfo, addGreetingsToWeeklyMail, addBulletinToWeeklyMail, removeBulletinFromWeeklymail, removeWeeklyMail };