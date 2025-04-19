import { API_BASE_URL } from "../constants/constants";

// Delete specific torrent from database and users torrents
const useDeleteTorrent = async (apiKey, torrent_id) => {
    const operation = "delete";
    try {
        const response = await fetch(
            `${API_BASE_URL}/torrents/controltorrent`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + apiKey,
                },
                body: JSON.stringify({ torrent_id, operation }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return { success: false, detail: data.detail };
        }

        return { success: true, detail: data.detail };
    } catch (e) {
        return { success: false, detail: "Unknown error (Probably CORS)" };
    }
};

export default useDeleteTorrent;
