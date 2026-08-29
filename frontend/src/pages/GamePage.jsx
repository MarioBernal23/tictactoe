import "../styles/GamePage.css";

function GamePage() {
    return (
        <div className="game-page">

            <h1>Tic Tac Toe</h1>

            <div className="game-header">
                <h2>Mario vs Alex</h2>
                <p>Turn: Mario</p>
                <p>You are: X</p>
            </div>

            <div className="board">
                <button className="cell"></button>
                <button className="cell"></button>
                <button className="cell"></button>

                <button className="cell"></button>
                <button className="cell"></button>
                <button className="cell"></button>

                <button className="cell"></button>
                <button className="cell"></button>
                <button className="cell"></button>
            </div>

            <div className="game-status">
                <p>Status</p>
                <p>Winner</p>
                <button>New Game</button>
                <button>Logout</button>
            </div>
        </div>
    );
}

export default GamePage;