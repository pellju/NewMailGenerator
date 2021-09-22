//Listing signups for the given week.

const listingSignups = (date, events, language) => {
    const sendingDate = new Date(`${date}`); //Converting the date the email will be sent.
    const signups = [];
    const week = returnWeekNumber(sendingDate);
    
    events.forEach((event) => {
        if (event.signupstarts.month === undefined || event.signupends.month === undefined) { //Checking if signup has not been set.
            console.log("undefined signup.");
        } else if (language === event.language && event.text != "-"){
            const signupOpensDate = new Date(`${event.signupstarts.year}-${event.signupstarts.month}-${event.signupstarts.day}`);
            const signupClosesDate = new Date(`${event.signupends.year}-${event.signupends.month}-${event.signupends.day}`);
            const signupOpeningWeek = returnWeekNumber(signupOpensDate);
            const signupClosingWeek = returnWeekNumber(signupClosesDate);

            if (signupOpeningWeek <= week && signupClosingWeek >= week){
                signups.push(event);
            }
        }
    })
    return signups;
}

//This function has been taken from https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
const returnWeekNumber = (wantedDate) => {
    wantedDate.setUTCDate(wantedDate.getUTCDate() + 4 - (wantedDate.getUTCDay() || 7));
    const firstDay = new Date(Date.UTC(wantedDate.getUTCFullYear(),0,4)); //4th day of January is always in the 1st week of the year.
    const weekNumber = Math.ceil(( ((wantedDate-firstDay) / 86400000) + 1)/7);
    return weekNumber;
};

//Listing bulletins for either the same week than weeklyMail is/will be sent, or the next week.
//weekVariable is either 0 or 1, depending on the week wanted to be listed.
const listItemsForAWeek = (sendingDate, listOfBulletins, weekVariable, language) => {
    const sendingWeek = returnWeekNumber(sendingDate);
    const bulletinsForTheGivenWeek = [];
    listOfBulletins.forEach((bulletin) => {
        if (bulletin.language === language && bulletin.category !== "Pohjanurkkaus" && bulletin.text !== "-"){
            const bulletinWeek = returnWeekNumber(new Date(`${bulletin.date.year}-${bulletin.date.month}-${bulletin.date.day}`));
            if (bulletinWeek === sendingWeek+weekVariable) {
                bulletinsForTheGivenWeek.push(bulletin);
            }
        }
    })  
    return bulletinsForTheGivenWeek;
}
export { listingSignups, listItemsForAWeek };