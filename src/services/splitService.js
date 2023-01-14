const fs = require("fs");
const path = require("path");

const splitService = {
    row: {},
    create(body) {
        if (splitService.row[body.ytID]) {
            if (splitService.row[body.ytID].exp + (1 * 60 * 1000) > +new Date) {
                return splitService.row[body.ytID];
            } else {
                splitService.delete(body.ytID);
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
        const audioPath = path.join(__dirname, "../public/audio", ytID);
        if (fs.existsSync(audioPath)) {
            fs.rmSync(audioPath, { recursive: true });
        }
        return;
    }
};

module.exports = splitService;