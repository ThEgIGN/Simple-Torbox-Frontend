import { Link } from "react-router-dom"

function NavBar() {
    return <nav className="navbar">
        <div className="navbar-brand">
            <Link to="/">Homepage</Link>
            <Link to="/add">Add Torrent</Link>
        </div>
    </nav>
}

export default NavBar