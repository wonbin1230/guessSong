const env = require("../env");

module.exports.loginAuth = function (req, res, next) {
    try {
        const userInfo = req.session.userInfo;
        // https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1657362502&redirect_uri=https%3A%2F%2Fa32d-114-34-188-110.jp.ngrok.io&state=jayKuo&scope=profile%20openid%20email
        if (!userInfo) {
            const lineLoginURL = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${env.lineLogin.clientId}&redirect_uri=${encodeURIComponent(env.lineLogin.redirectUrl)}&state=jayKuo&scope=profile%20openid%20email`;
            return res.redirect(lineLoginURL);
        }
        next();
    } catch (err) {
        next(err);
    }
};