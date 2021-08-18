import {Application, HttpServerStd, Router} from "https://deno.land/x/oak@v7.7.0/mod.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";

const app = new Application({
    serverConstructor: HttpServerStd,
});
const router = new Router();

configure({
    views: `${Deno.cwd()}/views/`,
});

const helloWorld = async ({ response }) => {
    response.body = await renderFile("frontpage.eta");
};
router.get("/", helloWorld);

app.use(router.routes());
app.listen({ port:7777 });