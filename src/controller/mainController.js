const env = require("../../env");
const axios = require("axios");
const jwtDecode = require("jwt-decode");

module.exports.login = async function (req, res, next) {
    try {
        const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
        const reqUrl = new URL(fullUrl);
        const params = reqUrl.searchParams;
        const code = params.get("code");

        if (!code || req.session.userInfo) {
            return res.redirect("/song/main");
        }

        const data = new URLSearchParams();
        data.append("grant_type", "authorization_code");
        data.append("code", code);
        data.append("redirect_uri", env.lineLogin.redirectUrl);
        data.append("client_id", env.lineLogin.clientId);
        data.append("client_secret", env.lineLogin.clientSecret);

        const axiosConfig = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data,
            url: env.lineLogin.getUserInfoUrl,
        };

        const userinfo = await axios(axiosConfig);

        //TODO: 判斷email 是否在Mongo內 不在就踢 在就回主頁
        const decodeUserInfo = jwtDecode(userinfo.data.id_token);
        req.session.userInfo = decodeUserInfo;
        res.redirect("/song/main");
    } catch (err) {
        console.log(err);
        next(err);
    }
};
