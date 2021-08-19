import { Pool } from "https://deno.land/x/postgres@v0.11.2/mod.ts";

//This file is used for creating SQL-connection between the database and the app itself.

//Connection details (change to your own ones!):
const CONNECTIONS = 2;
const databasePool = new Pool ({
    hostname: "",
    database: "",
    user: "",
    password: "",
    port: 5432,
}, CONNECTIONS);

//Querying the database.
const queryDatabase = async(query, ...args) => {
    const response = {};
    let client;

    client = await databasePool.connect();
    const result = await client.queryObject(query, ...args);
    if (result.rows.length > 0){
        response.rows = result.rows;
    }
    return response;
};

export { queryDatabase };