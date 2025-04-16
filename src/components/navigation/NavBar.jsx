import { Link, useLocation, useNavigate } from "react-router-dom"
import { useSWRConfig } from "swr";
import "../../css/NavBar.css";
import NavItem from "./NavItem";
import DropdownMenu from "./DropdownMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactComponent as STFLogo } from "../../icons/reshot-icon-screen-9M3SDKFZCN.svg";
import { useState } from "react";

function NavBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { mutate } = useSWRConfig();

    const [openDropdownMenu, setOpenDropdownMenu] = useState(false);

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
            <div className="navbar-title-and-logo">
                <div className="navbar-logo"><Link to="/dashboard"><STFLogo /></Link></div>
                <h2>STF Dashboard</h2>
            </div>
            <ul className="navbar-nav">
                <NavItem icon={<FontAwesomeIcon icon={"plus"} />} />
                <NavItem icon={<FontAwesomeIcon icon={"magnifying-glass"} />} />
                <NavItem icon={<FontAwesomeIcon icon={"sort"} />}>
                    <DropdownMenu>
                        <p>Hello World3</p>
                        <p>Hello World2</p>
                        <p>Hello World1</p>
                    </DropdownMenu>
                </NavItem>
                <NavItem icon={<FontAwesomeIcon icon={"user"} />}>
                    <DropdownMenu>
                        <p>Hello World1</p>
                        <p>Hello World2</p>
                        <p>Hello World3</p>
                    </DropdownMenu>
                </NavItem>
            </ul>
        </nav>
    }
}

export default NavBar