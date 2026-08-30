import { useEffect, useState } from "react";
import { createGame, makeMove } from "../services/gameService";
import { useNavigate } from "react-router-dom";
import "../styles/GamePage.css";

function GamePage() {
    const [game, setGame] = useState(null);
    const [player, setPlayer] = useState(null);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    
    useEffect(() => {
        const loadGame = async () => {
            const savedPlayer = JSON.parse(localStorage.getItem("player"));

            setPlayer(savedPlayer);

            const game = await createGame(savedPlayer.id, 2);

            setGame(game);
        };

        loadGame();
    }, []);

    if (!game || !player) {
        return <p>Loading game...</p>;
    }

    const handleMove = async (position) => {
        try {
            setError("");

            const updatedGame = await makeMove(game.id, position);

            setGame(updatedGame);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                JSON.stringify(error.response?.data) ||
                "Something went wrong"
            );
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("player");
        navigate("/");
    };

    const handleNewGame = async () => {
        try {
            setError("");

            const newGame = await createGame(player.id, 2);

            setGame(newGame);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                JSON.stringify(error.response?.data) ||
                "Something went wrong"
            );
        }
    };
    
    return (
        <div className="game-page">

            <h1>Tic Tac Toe</h1>

            <div className="game-header">
                <h2>
                    {game.player1.username} VS {game.player2.username}
                </h2>

                <p>
                    Turn: {game.currentPlayer.username}
                </p>

                <p>
                    You are: {
                        game.player1.id === player.id
                            ? game.player1Symbol
                            : game.player2Symbol
                    }
                </p>
            </div>

            {error && (
                <p className="game-error">
                    {error}
                </p>
            )}
            
            <div className="board">
                {game.board.cells.map((cell, index) => (
                    <button
                        className="cell"
                        key={index}
                        onClick={() => handleMove(index)}
                    >
                        {cell}
                    </button>
                ))}
            </div>



            <div className="game-status">
                <p>
                    Status: {game.status}
                </p>

                    {game.status === "FINISHED" && game.winner && (
                        <p>Winner: {game.winner.username}</p>
                    )}

                    {game.status === "FINISHED" && !game.winner && (
                        <p>Draw!</p>
                    )}

                <button onClick={handleNewGame}>
                    New Game
                </button>

                <button onClick={handleLogout}>
                    Logout
                </button>

            </div>

        </div>
    );
}

export default GamePage;