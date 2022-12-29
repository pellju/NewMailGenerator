import { Pool } from "https://deno.land/x/postgres@v0.11.2/mod.ts";

//This file is used for creating SQL-connection between the database and the app itself.

//Connection details (change to your own ones!):
const CONNECTIONS = 2;
const databasePool = new Pool ({
  hostname: Deno.env.get("PGHOST"),
  user: Deno.env.get("PGUSER"),
  password: Deno.env.get("PGPASSWORD"),
  database: Deno.env.get("PGDATABASE"),
  port: Deno.env.get("PGPORT"),
}, CONNECTIONS);

//The following function has been got from "Web Software Development Summer Course 2021",
//Aalto University 27.08.2021. Link to the page code is found:
// https://wsd.cs.aalto.fi/7-working-with-databases/6-connection-pool/
const queryDatabase = async (query, ...args) => {
    const response = {};
    let client;
  
    try {
      client = await databasePool.connect();
      const result = await client.queryObject(query, ...args);
      if (result.rows) {
        response.rows = result.rows;
      }
    } catch (e) {
      console.log(e);
      response.error = e;
    } finally {
      try {
        await client.release();
      } catch (e) {
        console.log(e);
      }
    }
  
    return response;
  };

export { queryDatabase };

