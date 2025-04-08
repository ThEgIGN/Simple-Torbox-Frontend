import usePasswordToggle from "../hooks/usePasswordToggle"
import "../css/Login.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [PasswordInputType, ToggleIcon] = usePasswordToggle();
    const [apiKey, setApiKey] = useState("");

    const navigate = useNavigate();

    // Check if user is already logged in and navigate them if so
    useEffect(() => {
        const storedKey = localStorage.getItem("torboxApiKey");
        storedKey && navigate("/dashboard", { state: { stateApiKey: storedKey } });
    }, [])

    const handleLogin = (e) => {
        e.preventDefault();
        const apiKeyTrimmed = apiKey.trim();
        if (!apiKeyTrimmed) return
        localStorage.setItem("torboxApiKey", apiKeyTrimmed);
        navigate("/dashboard", { state: { stateApiKey: apiKeyTrimmed } });
    }

    return (
        <div className="login">
            <h1>Torbox Simple Frontend</h1>
            <form onSubmit={handleLogin} className="login-form">
                <div className="text-input">
                    <input
                        type={PasswordInputType}
                        placeholder="Enter your API key..."
                        onChange={(e) => setApiKey(e.target.value)}
                        required={true}
                    />
                    <span className="password-toggle-icon">{ToggleIcon}</span>
                </div>
                <div className="button-wrapper"><button type="submit" className="submit-button">Login</button></div>
            </form>
            <div className="api-key-help">
                    <p>Don't know where to find your API key? <a href="https://torbox.app/settings">Look here!</a></p>
            </div>
        </div>
    )
}

export default Login