import {Application, HttpServerStd, Router} from "https://deno.land/x/oak@v7.7.0/mod.ts";
import { OakSession } from "https://deno.land/x/sessions@v1.5.4/mod.ts";

import { frontPage } from "./controllers/frontpage.js";
import { registrationFunction, registrationPage } from "./controllers/registration.js";
import { showLogin, sendLogin } from "./controllers/login.js";
import { showDashboard, addNewWeeklyMail } from "./controllers/dashboard.js";
import { listAllBulletins, addNewBulletin } from "./controllers/bulletins.js";
import { showBulletinData } from "./controllers/bulletinData.js";

import renderMiddleware from "./utilities/renderMiddleware.js";
import checkAuthentication from "./utilities/authenticationChecker.js";
//This file contains information for running the web server.

//Creating a new web app and a router to route.
const app = new Application({
    serverConstructor: HttpServerStd,
});
const router = new Router();
new OakSession(app);

router.get("/bulletins/:id", showBulletinData);
router.get("/bulletins", listAllBulletins);
router.get("/dashboard",showDashboard);
router.get("/login", showLogin);
router.get("/register", registrationPage);
router.get("/", frontPage);

router.post("/bulletins", addNewBulletin)
router.post("/dashboard", addNewWeeklyMail);
router.post("/login", sendLogin);
router.post("/register", registrationFunction);

app.use(renderMiddleware);
app.use(checkAuthentication);

app.use(router.routes());
app.listen({ port:7777 });