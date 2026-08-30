import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, createPlayer } from "../services/playerService";
import "../styles/LoginPage.css"
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

    const handleGuest = async () => {
        const username = `guest${Date.now()}`;
        const password = "guestpassword";

        try {
            const player = await createPlayer(username, password);

            localStorage.setItem("player", JSON.stringify(player));

            navigate("/game");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="login-card">

            <h1 className="login-title">
                Tic Tac Toe
            </h1>

            <form className="login-form" onSubmit={handleLogin}>

                <div className="form-group">
                    <label htmlFor="username">
                        Username
                    </label>

                    <input
                        className="form-input"
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">
                        Password
                    </label>

                    <input
                        className="form-input"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>

                <button className="primary-button" type="submit">
                    Login
                </button>

            </form>

            <div className="login-actions">
                <button
                    className="guest-button"
                    type="button"
                    onClick={handleGuest}
                >
                    Play as guest
                </button>
                
                <Link className="register-link" to="/register">
                    Create account
                </Link>

            </div>

        </div>
    );
}

export default LoginPage;