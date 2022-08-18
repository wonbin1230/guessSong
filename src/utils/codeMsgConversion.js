const codeStatusConversion = Object.freeze({
    "0": "Success",
    "1": "JwtSaveError",
    "2": "JwtAuthFail",
    "3": "ParamsError",
    "50": "pgDBInsertFail",
    "51": "pgDBQueryFail",
    "98": "TestAsyncReject",
    "99": "Uncaught"
});

const statusMsgConversion = Object.freeze({
    "Success": "成功",
    "JwtAuthFail": "jwt Token 驗證失敗",
    "ParamsError": "參數錯誤",
    "pgDBInsertFail": "新增失敗",
    "pgDBQueryFail": "查詢失敗",
    "TestAsyncReject": "測試Async Reject",
    "Uncaught": "未定義的錯誤"
});

module.exports = function (code) {
    if (isNaN(code)) {
        return "Code is not a number";
    }

    const statusKey = codeStatusConversion[code] || codeStatusConversion["99"];
    return statusMsgConversion[statusKey];
};
