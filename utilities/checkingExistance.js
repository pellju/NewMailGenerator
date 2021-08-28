import { getBulletinData, getWeeklyMailData } from "../database/sqlCommunication.js";
//File contains functions for checking if bulletin or weeklymail with given ID exists.

const checkIfBulletinExists = async (bulletinID) => {
    const bulletinData = await getBulletinData(bulletinID);
    let existance = false;
    let dataFromBulletin = null;
    if (bulletinData.length > 0){
        existance = true;
        dataFromBulletin = bulletinData[0];
    }
    return [existance, dataFromBulletin];
};

const checkIfWeeklymailExists = async (weeklymailID) => {
    const weeklymailData = await getWeeklyMailData(weeklymailID);
    let existance = false;
    let dataFromWeeklymail = null;
    if (weeklymailData.length > 0){
        existance = true;
        dataFromWeeklymail = weeklymailData[0];
    }
    return [existance, dataFromWeeklymail];
};

export { checkIfBulletinExists, checkIfWeeklymailExists};