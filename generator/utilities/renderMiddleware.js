import { configure, renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
//This utility is used for serving eta-files (HTML).
//Idea has been taken from https://wsd.cs.aalto.fi/12-routes-and-view-templates/4-view-templates/ as 19.8.2021.
//Using because of DRY (Don't Repeat Yourself).

configure({
  views: `${Deno.cwd()}/views/`,
});

const render = async (context, next) => {
  context.render = async (file, data) => {
    context.response.headers.set("Content-Type", "text/html; charset=utf-8");
    context.response.body = await renderFile(file, data);
  };

  await next();
};

export default render;