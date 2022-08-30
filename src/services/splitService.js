const splitService = {
    row: {},
    create(body) {
        if (splitService.row[body.ytID]) {
            return splitService.row[body.ytID];
        }
        splitService.row[body.ytID] = body;
        return;
    },
    addDuration(ytID, key, time) {
        splitService.row[ytID][key] = time;
        return;
    },
    read(ytID) {
        return splitService.row[ytID];
    },
    delete(ytID) {
        delete splitService.row[ytID];
        return;
    }
};

module.exports = splitService;