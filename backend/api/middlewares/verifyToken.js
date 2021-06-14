const jwt = require('jsonwebtoken');
const secret = require('../../config/secret.js');

// El token se recibe desde la cabecera de la petición (la manda el frontend)
module.exports = async (ctx, next) => {
    if (!ctx.headers.authorization) {
        ctx.response.body = { msg: "No token provided" };
        ctx.code = 403;
    }
    else {
        console.log(`header: ${ctx.headers.authorization}`)
        const token = ctx.headers.authorization.split(' ')[1]; // Esto se hace porque el header empieza por "Bearer eyGRasf...fsd"

        try {
            ctx.requst.jwtPayload = jwt.verify(token, secret);
        }
        catch (err) {
            ctx.response.body = { msg: "Wrong token" };
            ctx.code = 403;
        }
    }
    await next();
};