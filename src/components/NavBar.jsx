import { Link, useLocation, useNavigate } from "react-router-dom"

function NavBar() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.setItem("torboxApiKey", "");
        navigate("/");
    }

    // Don't display navigation bar on login page 
    if (location.pathname === "/") {
        return <></>
    } else {
        return <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/dashboard">Homepage</Link>
                <Link to="/add">Add Torrent</Link>
                <p onClick={handleLogout}>Logout</p>
            </div>
        </nav>
    }
}

export default NavBar