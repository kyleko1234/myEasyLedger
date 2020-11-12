import {ACCESS_TOKEN} from "./constants.js"

var axios = require("axios");

export const jwtToken = localStorage.getItem(ACCESS_TOKEN);

axios.interceptors.request.use(
  function(config) {
    if (jwtToken) {
      config.headers["Authorization"] = "Bearer " + jwtToken;
    }
    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
);