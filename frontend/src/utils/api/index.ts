import axios from "axios";

const mainBaseURL = "http://localhost:5001";

export const axiosMainInstance = axios.create({ baseURL: mainBaseURL });
