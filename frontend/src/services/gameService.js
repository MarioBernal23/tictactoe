import axios from "axios";

const API_URL = "http://localhost:8080/api/games";

export const createGame = async (player1Id, player2Id) => {
    const response = await axios.post(API_URL, {
        player1Id,
        player2Id
    });

    return response.data;
};

export const makeMove = async (gameId, position) => {
    const response = await axios.post(
        `${API_URL}/${gameId}/moves`,
        {
            position: position
        }
    );

    return response.data;
};