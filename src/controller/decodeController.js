const cardModel = require("../models/view/cardModel");
const cardService = require("../services/cardService");
const errModel = require("../models/errModel");

module.exports.createCard = async function (req, res, next) {
    try {
        const { error: joiErr } = cardModel.createCard.validate(req.body);
        if (joiErr) {
            throw new errModel(3, joiErr.message);
        }
        const resData = await cardService.createCard(req.body);
        res.json(resData);
    } catch (err) {
        next(err);
    }

    /* @swagger comment
        #swagger.description = "新增Card"
        #swagger.summary = "新增Card"
        #swagger.tags = ['Card']
        #swagger.security = [{
            "jwt": []
        }]
        #swagger.requestBody = { 
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/createCardSchema" }   
                }
            }
        }
        #swagger.responses[200] = {
            description: "成功",
            schema: { $ref: "#/components/schemas/resSchema" }
        }
    */
};

module.exports.readCard = async function (req, res, next) {
    try {
        const { error: joiErr } = cardModel.readCard.validate(req.query);
        if (joiErr) {
            throw new errModel(3, joiErr.message);
        }
        const resData = await cardService.readCard(req.query);
        res.json(resData);
    } catch (err) {
        next(err);
    }
    /* @swagger comment
        #swagger.description = "查詢Card"
        #swagger.summary = "查詢Card"
        #swagger.tags = ['Card']
        #swagger.security = [{
            "jwt": []
        }]
        #swagger.parameters["listId"] = {
            in: "query",
            required: true,
            type: "integer",
            description: "卡片存在於哪個清單"
        }
        #swagger.parameters["name"] = {
            in: "query",
            type: "string",
            description: "卡片名稱"
        }
        #swagger.parameters["positionNo"] = {
            in: "query",
            type: "integer",
            description: "卡片位置"
        }
        #swagger.parameters["archive"] = {
            in: "query",
            type: "boolean",
            description: "封裝"
        }
        #swagger.parameters["status"] = {
            in: "query",
            type: "string",
            description: "卡片狀態"
        }
        #swagger.responses[200] = {
            description: "成功",
            schema: { $ref: "#/components/schemas/resSchema" }
        }
    */
};

module.exports.updateCard = async function (req, res, next) {
    try {
        const { error: joiErr } = cardModel.updateCard.validate(req.body);
        if (joiErr) {
            throw new errModel(3, joiErr.message);
        }
        const resData = await cardService.updateCard(req.body);
        res.json(resData);
    } catch (err) {
        next(err);
    }
    /* @swagger comment
        #swagger.description = "更新Card"
        #swagger.summary = "更新Card"
        #swagger.tags = ['Card']
        #swagger.security = [{
            "jwt": []
        }]
        #swagger.requestBody = { 
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/updateCardSchema" }   
                }
            }
        }
        #swagger.responses[200] = {
            description: "成功",
            schema: { $ref: "#/components/schemas/resSchema" }
        }
    */
};

module.exports.deleteCard = async function (req, res, next) {
    try {
        const { error: joiErr } = cardModel.deleteCard.validate(req.query);
        if (joiErr) {
            throw new errModel(3, joiErr.message);
        }
        const resData = await cardService.deleteCard(req.query);
        res.json(resData);
    } catch (err) {
        next(err);
    }
    /* @swagger comment
        #swagger.description = "刪除Card"
        #swagger.summary = "刪除Card"
        #swagger.tags = ['Card']
        #swagger.security = [{
            "jwt": []
        }]
        #swagger.parameters["id"] = {
            in: "query",
            required: true,
            type: "string",
            description: "唯一辨識碼"
        }
        #swagger.responses[200] = {
            description: "成功",
            schema: { $ref: "#/components/schemas/resSchema" }
        }        
    */
};