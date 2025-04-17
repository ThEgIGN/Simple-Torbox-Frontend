import "../../css/NavBar.css";

function DropdownItem(props) {
    return (
        <div className={!!props.header ? "dropdown-menu-item-header" : "dropdown-menu-item"}>
            {props.children}
        </div>
    );
}

export default DropdownItem;