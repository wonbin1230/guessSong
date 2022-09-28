const apiUrl = axios.create({
  baseUrl: "http://192.168.10.20:3000",
  headers: { "Content-Type": "application/json" },
  timeout: 20000
});

apiUrl.interceptors.request.use(
  (config) => {
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

apiUrl.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          console.log("你要找的頁面不存在");
          // go to 404 page
          break;
        case 500:
          console.log("程式發生問題");
          // go to 500 page
          break;
        default:
          console.log(error.message);
      }
    }
    if (!window.navigator.onLine) {
      alert("網路出了點問題，請重新連線後重整網頁");
      return;
    }
    return Promise.reject(error);
  }
);

function apiServer(method, url, data = null, config) {
  method = method.toLowerCase();
  switch (method) {
    case "post":
      return apiUrl.post(url, data, config);
    case "get":
      return apiUrl.get(url, { params: data });
    case "delete":
      return apiUrl.delete(url, { params: data });
    case "put":
      return apiUrl.put(url, data);
    case "patch":
      return apiUrl.patch(url, data);
    default:
      console.log(`未知的 method: ${method}`);
      return false;
  }
}

const apiPath = {
  readSongAll: "/song",
  applyDeleteSong: "/song/apply",
  readSongByytID: "/song/read",
  readSong: "/song/read",
  createSong: "/song",
  deleteSong: "/song",
  //readSampleSong: `/song/sample?ytID=${ytID}&paragraph=${paragraph}&fileFormat=mp3`,
  applyAddSong: "/song/apply",
};

const readSongAll = () => {
  return apiServer("get", apiPath.readSongAll);
};

// const applyAddSong = (_id) => {
//   return apiServer("delete", apiPath.deleteSong, _id);
// };
