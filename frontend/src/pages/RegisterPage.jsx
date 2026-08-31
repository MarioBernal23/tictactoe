import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPlayer } from "../services/playerService";
import "../styles/RegisterPage.css"

function RegisterPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("The passwords don't match");
            return;
        }
        
        await createPlayer(username, password);
        navigate("/");
    };

    return (
        <div className="register-card">
            <h1 className="register-title">
                Tic Tac Toe
            </h1>

            <form className="register-form" onSubmit={handleRegister}>

                <div className="form-group">
                    <label htmlFor="username">
                        Username
                    </label>

                    <input
                        className="form-input"
                        type="text"
                        id="username"
                        name="username"
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
                        id="password"
                        name="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">
                        Confirm Password
                    </label>

                    <input
                        className="form-input"
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        required
                    />
                </div>

                <button className="primary-button" type="submit">
                    Register
                </button>

            </form>

            <div className="register-actions">
                <Link className="login-link" to="/">
                    Login
                </Link>
            </div>

        </div>
    );
}

export default RegisterPage;