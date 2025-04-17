import "../../css/NavBar.css";
import { useEffect, useRef, useState } from "react";
import { DropdownMenuRefContext } from "./DropdownMenuRefContext";

function NavItem(props) {
    const dropdownRef = useRef();
    const buttonRef = useRef();
    const [open, setOpen] = useState(false);

    useEffect(() => {

        // If user clicks on button, open/close dropdown menu
        // If user clicks outside of dropdown menu, close it
        const handler = (e) => {
            if (!dropdownRef.current || !buttonRef.current) return;
            if (buttonRef.current.contains(e.target)) return;
            if (!dropdownRef.current.contains(e.target)) setOpen(false);
        }

        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        }
    }, [dropdownRef])

    return (
        <li className="nav-item">
            <a className="icon-button" onClick={() => setOpen(!open)} ref={buttonRef}>
                {props.icon}
            </a>

            {open && <DropdownMenuRefContext value={dropdownRef}>{props.children}</DropdownMenuRefContext>}
        </li>
    )
}

export default NavItem;