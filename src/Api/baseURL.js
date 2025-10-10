import axios from "axios";

const baseUrl = axios.create({
  baseURL: "https://www.zuhall.com/",
});

export default baseUrl;
