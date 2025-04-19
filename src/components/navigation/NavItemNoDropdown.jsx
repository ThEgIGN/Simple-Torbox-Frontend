import "../../css/NavBar.css";

function NavItemNoDropdown(props) {
    return (
        <li className="nav-item">
            <a className="icon-button" onClick={props.function}>
                {props.icon}
            </a>
        </li>
    )
}

export default NavItemNoDropdown;