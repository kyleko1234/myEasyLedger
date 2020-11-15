import {ACCESS_TOKEN} from "./constants.js"

var axios = require("axios");

axios.interceptors.request.use(
  function(config) {
    let jwtToken = localStorage.getItem(ACCESS_TOKEN);
    if (jwtToken) {
      config.headers["Authorization"] = "Bearer " + jwtToken;
    }
    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
);