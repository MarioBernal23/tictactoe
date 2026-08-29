import { Link } from "react-router-dom";

function LoginPage() {

    const handleLogin = (event) => {
        event.preventDefault();

        // Más adelante conectaremos con el backend
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