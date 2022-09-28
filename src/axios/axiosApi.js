const apiPath = {
    readSongAll: "/song",
    applyDeleteSong: "/song/apply",
    readSongByytID: "/song/read",
    readSong: "/song/read",
    createSong: "/song",
    deleteSong: "/song",
    readSampleSong: `/song/sample?ytID=${ytID}&paragraph=${paragraph}&fileFormat=mp3`,
    applyAddSong: "/song/apply",
};

const readSongAll = () => {
    return apiUrl("get", apiPath.readSongAll);
};

const applyAddSong = (_id) => {
    return apiUrl("delete", apiPath.deleteSong, _id);
};
