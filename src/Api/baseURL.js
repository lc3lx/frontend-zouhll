import axios from "axios";

const baseUrl = axios.create({
  baseURL: "http://www.zuhall.com/",
});

export default baseUrl;
