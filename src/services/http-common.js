import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:4000/api/v1/",
    headers: {
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    "Content-type": "application/json"
  }

});

export default API;