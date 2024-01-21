import axios from "axios"

const mockBaseURL = "http://localhost:3030";

export const axiosMockInstance = axios.create({ baseURL: mockBaseURL });