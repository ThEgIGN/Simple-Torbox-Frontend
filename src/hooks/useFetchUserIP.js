import { IP_GRAB_API_URL } from "../constants/constants";

async function useFetchUserIP() {
    try {
        const response = await fetch(IP_GRAB_API_URL, {
            method: "GET",
        });

        const data = await response.json();

        if (!response.ok) return "";

        return data.ip;
    } catch (e) {
        return "";
    }
}

export default useFetchUserIP;
