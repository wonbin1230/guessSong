import Api from "./axiosServer";

const apiPath = {
    readSongAll: '/song',
    applyDeleteSong: '/song/apply',
    readSongByytID: '/song/read',
    readSong: '/song/read',
    createSong: '/song',
    deleteSong: '/song',
    readSampleSong: `/song/sample?ytID=${ytID}&paragraph=${paragraph}&fileFormat=mp3`,
    applyAddSong: '/song/apply',
};

const readSongAll = () => {
    return Api("get", apiPath.readSongAll)
};

const applyAddSong = (_id) => {
    return Api("delete", apiPath.deleteSong, _id)
};

