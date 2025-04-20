import { API_BASE_URL } from "../constants/constants";

// Used when user wants to copy download link for specific torrent
// This is not used for download. Download uses specific link for redirect to save on API calls
const useFetchDownloadLink = async (apiKey, torrentId, fileId, userIP) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/torrents/requestdl?token=${apiKey}&torrent_id=${torrentId}\
&file_id=${fileId}&user_ip=${userIP}`,
            {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + apiKey,
                },
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return { success: false, error: data.detail, link: null };
        }

        return { success: true, error: null, link: data.data };
    } catch (e) {
        return {
            success: false,
            error: "Unknown error (Probably CORS)",
            link: null,
        };
    }
};

export default useFetchDownloadLink;
