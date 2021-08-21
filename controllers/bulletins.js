import { getBulletins } from "../database/sqlCommunication.js";
import { parseBulletins } from "../utilities/parseBulletin.js";

const listAllBulletins = async ({ render }) => {

    const data = {
        items: parseBulletins(await getBulletins()),
    };
    console.log(data.items);
    render("bulletins.eta", data);
}

export { listAllBulletins };