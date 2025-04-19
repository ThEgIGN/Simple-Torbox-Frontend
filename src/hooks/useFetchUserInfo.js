import { API_BASE_URL } from "../constants/constants";

const useFetchUserInfo = async (apiKey) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/user/me`,
            {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + apiKey,
                },
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return { success: false, error: data.detail, data: null };
        }

        return { success: true, error: null, data: data.data };
    } catch (e) {
        return { success: false, error: "Unknown error (Probably CORS)", data: null };
    }
};

export default useFetchUserInfo;
