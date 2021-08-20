const checkAuthentication = async ({ response, request, state}, next) => {
    const authentication = await state.session.get("Authenticated");

    if (!authentication && (request.url.pathname.startsWith("/dashboard"))) {
        response.redirect("/login");
    } else {
        await next();
    }
}

export default checkAuthentication;