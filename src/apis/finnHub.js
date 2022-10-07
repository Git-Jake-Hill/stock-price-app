import axios from "axios"
import { FINHUB_API_KEY } from "../API_KEYS";

const TOKEN = FINHUB_API_KEY;

export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params: {
        token: TOKEN
    }
})