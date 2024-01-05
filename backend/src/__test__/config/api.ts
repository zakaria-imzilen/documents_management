import axios from "axios";
import { baseBackEndURL } from "../document/routes.test";

export const axiosInstance = axios.create({ baseURL: baseBackEndURL });
