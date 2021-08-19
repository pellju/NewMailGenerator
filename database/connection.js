import { Pool } from "https://deno.land/x/postgres@v0.11.2/mod.ts";

const CONNECTIONS = 2;
const databasePool = new Pool ({
    hostname: "",
    database: "",
    user: "",
    password: "",
    port: 5432,
}, CONNECTIONS);

const queryDatabase = async(query, ...args) => {
    const reponse = {};
    let client;

    client = await databasePool.connect();
    const result = await client.queryObject(query, ...args);
    if (result.rows.length > 0){
        response.rows = result.rows;
    }
    return response;
};

export { queryDatabase };

