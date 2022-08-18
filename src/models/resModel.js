const getCodeMsg = require("../utils/codeMsgConversion");

class resModel {
    constructor(data, code = 0) {
        this.code = code;
        this.data = data;
        this.msg = getCodeMsg(code);
    }
}

module.exports = resModel;