const codeStatusConversion = Object.freeze({
    "0": "Success",
    "1": "ParamError",
    "2": "NotExist",
    "99": "Unknow"
});

const statusMsgConversion = Object.freeze({
    "Success": "成功",
    "ParamError": "參數錯誤",
    "NotExist": "檔案/資料夾不存在",
    "Unknow": "未知的錯誤"
});

module.exports = function (code) {
    if (isNaN(code)) {
        return "Code is not a number";
    }

    const statusKey = codeStatusConversion[code] || codeStatusConversion["99"];
    return statusMsgConversion[statusKey];
};
