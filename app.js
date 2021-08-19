import {Application, HttpServerStd, Router} from "https://deno.land/x/oak@v7.7.0/mod.ts";
//import { configure, renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import { frontPage } from "./controllers/frontpage.js";

const app = new Application({
    serverConstructor: HttpServerStd,
});
const router = new Router();


router.get("/", frontPage);

app.use(router.routes());
app.listen({ port:7777 });