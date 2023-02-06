import axios from "axios";

const API = axios.create({
    baseURL: "http://3.16.114.181:4000/api/v1/",
    headers: {
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    "Content-type": "application/json"
  }

});

export default API;