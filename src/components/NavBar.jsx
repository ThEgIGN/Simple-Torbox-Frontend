import { Link, useLocation, useNavigate } from "react-router-dom"
import { useSWRConfig } from "swr";

function NavBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { mutate } = useSWRConfig();

    // Once user logs out, clear SWR fetched data,
    // so when next user logs in, they don't see previous users data for couple of seconds
    const clearSWRCache = () => {
        mutate(
            key => true, // which cache keys are updated
            undefined, // update cache data to undefined
            { revalidate: false } // do not revalidate
        )
    }

    const handleLogout = () => {
        localStorage.setItem("torboxApiKey", "");
        clearSWRCache();
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