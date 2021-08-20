//Simply checking if the user has authenticated before accessing to defined paths

const checkAuthentication = async ({ response, request, state}, next) => {
    const authentication = await state.session.get("Authenticated");

    if (!authentication && (request.url.pathname.startsWith("/dashboard") || request.url.pathname.startsWith("/bulletins"))) {
        response.redirect("/login");
    } else {
        await next();
    }
}

export default checkAuthentication;