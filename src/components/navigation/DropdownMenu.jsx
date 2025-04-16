import { useContext } from "react";
import "../../css/NavBar.css";
import { DropdownMenuRefContext } from "./DropdownMenuRefContext";

function DropdownMenu(props) {
    const dropdownRef = useContext(DropdownMenuRefContext);

    function DropdownItem(props) {
        return (
            <div className="dropdown-menu-item">
                {props.children}
            </div>
        );
    }

    return (
        <div className="dropdown-menu" ref={dropdownRef}>
            {props.children && props.children.map((component, index) => <DropdownItem key={index}>{component}</DropdownItem>)}
        </div>
    );
}

export default DropdownMenu;