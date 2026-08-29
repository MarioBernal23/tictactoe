import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/playerService";

function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const player = await login(username, password);

            localStorage.setItem("player", JSON.stringify(player));
            navigate("/game");
        } catch (error) {
            console.error(error);
        }
    };

    const handleGuest = () => {
        // Más adelante crearemos/obtenemos el usuario invitado
    };

    return (
        <div>
            <h1>Tic Tac Toe</h1>

            <form onSubmit={handleLogin}>

                <div>
                    <label htmlFor="username">
                        Username
                    </label>

                    <input
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">
                        Password
                    </label>

                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>

                <button type="submit">
                    Login
                </button>

            </form>

            <Link to="/register">
                Create account
            </Link>

            <button type="button" onClick={handleGuest}>
                Play as guest
            </button>
        </div>
    );
}

export default LoginPage;