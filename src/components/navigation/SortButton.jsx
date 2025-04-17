import "../../css/DropdownComponents.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SortButton({ sortName, active, onSelect }) {
    return (
        <div className="sort-button-wrapper" onClick={() => onSelect(sortName)}
            style={{
                "--color": active ? "rgba(220, 20, 60, 0.75)" : "rgba(205, 205, 205, 0.87)",
                "--border-size": active ? "3px" : "1px"
            }}>
            <div className="sort-name">
                <p>{sortName}</p>
            </div>
            <div className="sort-checkbox">{active && <FontAwesomeIcon icon={"circle-check"} />}</div>
        </div>
    );
}

export default SortButton;