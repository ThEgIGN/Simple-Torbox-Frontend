import { useContext } from "react";
import "../../css/NavBar.css";
import DropdownItem from "./DropdownItem";
import { DropdownMenuRefContext } from "./DropdownMenuRefContext";

function DropdownMenu(props) {
    const dropdownRef = useContext(DropdownMenuRefContext);

    return (
        <div className="dropdown-menu" ref={dropdownRef} style={props.width && { width: props.width }}>
            {props.children && props.children.length > 1 ?
                props.children.map((component, index) =>
                    !!component.props.header ?
                        <DropdownItem key={index} header={"true"}>{component}</DropdownItem> :
                        <DropdownItem key={index}>{component}</DropdownItem>) :
                <DropdownItem>{props.children}</DropdownItem>}
        </div>
    );
}

export default DropdownMenu;