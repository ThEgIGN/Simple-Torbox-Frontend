import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Show and hide password in input when user clicks icon
const usePasswordToggle = () => {
    const [visible, setVisible] = useState(false);

    const Icon = (
        <FontAwesomeIcon
            icon={visible ? "eye" : "eye-slash"}
            onClick={() => setVisible((visible) => !visible)}
        />
    );
    const InputType = visible ? "text" : "password";

    return [InputType, Icon];
};

export default usePasswordToggle;
