const env = require("../../env");
const axios = require("axios");
const jwtDecode = require("jwt-decode");
const errModel = require("../models/errModel");

module.exports.login = async function (req, res, next) {
    try {
        /*  
        line login的網址
        https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1657362502&redirect_uri=https%3A%2F%2Fa32d-114-34-188-110.jp.ngrok.io&state=jayKuo&scope=profile%20openid%20email
        */
        const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
        const reqUrl = new URL(fullUrl);
        const params = reqUrl.searchParams;
        const code = params.get("code");

        const data = new URLSearchParams();
        data.append("grant_type", "authorization_code");
        data.append("code", code);
        data.append("redirect_uri", env.lineLogin.redirectUrl);
        data.append("client_id", env.lineLogin.clientId);
        data.append("client_secret", env.lineLogin.clientSecret);

        const axiosConfig = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        };

        const userinfo = await axios.post("https://api.line.me/oauth2/v2.1/token", data, axiosConfig);

        //TODO: 判斷email 是否在Mongo內 不在就踢 在就回主頁
        console.log(userinfo.data);
        const decodeUserInfo = jwtDecode(userinfo.data.id_token);
        console.log(decodeUserInfo);
        req.session.userInfo = decodeUserInfo;
        console.log(req.session.userInfo);
        res.json("OK");
    } catch (err) {
        console.log(err);
        next(err);
    }
};
