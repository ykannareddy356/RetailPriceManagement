import axios from "axios";

const API = axios.create({
  baseURL: "https://retailpricemanagement.onrender.com/api/",
});

export default API;