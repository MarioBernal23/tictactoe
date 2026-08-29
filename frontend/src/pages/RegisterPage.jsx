import { Link } from "react-router-dom";

function RegisterPage() {

    const handleRegister = (event) => {
        event.preventDefault();

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