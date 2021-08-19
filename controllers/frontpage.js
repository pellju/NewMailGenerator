import { configure, renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";

configure({
    views: `${Deno.cwd()}/views/`,
});

const frontPage = async({ response }) => {
    response.body = await renderFile("frontpage.eta");
}

export { frontPage };