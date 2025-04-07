import usePasswordToggle from "../hooks/usePasswordToggle"
import "../css/Login.css"
import "../css/Input.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [PasswordInputType, ToggleIcon] = usePasswordToggle();
    const [apiKey, setApiKey] = useState("");

    const navigate = useNavigate();

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
            <form onSubmit={handleLogin} className="login-form">
                <input
                    type={PasswordInputType}
                    placeholder="Enter your API key..."
                    className="text-input"
                    onChange={(e) => setApiKey(e.target.value)}
                />
                <span className="password-toggle-icon">{ToggleIcon}</span>
                <button type="submit" className="submit-button">Login</button>
            </form>
        </div>
    )
}

export default Login