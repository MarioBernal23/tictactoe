import axios from "axios";

const API_URL = "http://localhost:8080/api/players";

export const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, {
        username,
        password
    });

    return response.data;
};

export const createPlayer = async (username, password) => {
    const response = await axios.post(API_URL, {
        username,
        password
    });

    return response.data;
};