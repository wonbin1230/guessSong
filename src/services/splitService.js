const fs = require("fs");
const path = require("path");

const splitService = {
    row: {},
    create(body) {
        if (splitService.row[body.ytID]) {
            if (splitService.row[body.ytID].exp + (1 * 60 * 1000) > +new Date) {
                return splitService.row[body.ytID];
            } else {
                const audioPath = path.join(__dirname, "../public/audio", body.ytID);
                fs.rmSync(audioPath, { recursive: true });
            }
        }
        splitService.row[body.ytID] = body;
        splitService.row[body.ytID].exp = +new Date;
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