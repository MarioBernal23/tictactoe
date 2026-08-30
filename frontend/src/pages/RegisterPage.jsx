import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPlayer } from "../services/playerService";

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
        <div>
            <h1>Tic Tac Toe</h1>

            <form onSubmit={handleRegister}>

                <div>
                    <label htmlFor="username">
                        Username
                    </label>

                    <input
                        type="text"
                        id="username"
                        name="username"
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
                        id="password"
                        name="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="confirmPassword">
                        Confirm Password
                    </label>

                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        required
                    />
                </div>

                <button type="submit">
                    Register
                </button>

            </form>

            <Link to="/">
                Login
            </Link>

        </div>
    );
}

export default RegisterPage;