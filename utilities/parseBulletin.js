//This file contains the function to parse bulletins date from "yyyy-mm-dd" to an object which contains day (dd), month (mm) and year (yyyy).

//This function is used for parsing and converting the dates found in the database.
const parseBulletins = (listOfBulletins) => {
    //const newBulletins = [];
    listOfBulletins.forEach((bulletin) => {
        /*const parsedBulletin = {
            id: bulletin.id,
            name: bulletin.name,
            date: parseDate(bulletin.date),
            signupStarts: parseDate(bulletin.signupStarts),
            signupEnds: parseDate(bulletin.signupEnds),
        }
        console.log(parsedBulletin);
        newBulletins.push(parsedBulletin);*/

        bulletin.date = parseDate(bulletin.date);
        bulletin.signupstarts = parseDate(bulletin.signupstarts);
        bulletin.signupends = parseDate(bulletin.signupends);
    })
    return listOfBulletins;
};

const parseDate = (date) => { //Date is a text-typed item.
    const splitDate = date.split("-");
    const newDate = {
        year: splitDate[0],
        month: splitDate[1],
        day: splitDate[2],
    }
    return newDate;
};

export { parseBulletins };