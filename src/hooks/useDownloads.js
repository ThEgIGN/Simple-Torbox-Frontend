import { API_BASE_URL } from "../constants/constants";
import useSWR from "swr";

// Grab all user torrents
const fetchTorrents = (apiKey) => {
    const fetcher = async (url) => {
        const res = await fetch(url, {
            headers: {
                Authorization: "Bearer " + apiKey,
            },
        });

        if (!res.ok) {
            const error = new Error(
                "An error occurred while getting the torrents."
            );
            // Attach extra info to the error object.
            error.info = await res.json();
            error.status = res.status;
            throw error;
        }

        return res.json();
    };

    const { data, error, isLoading } = useSWR(
        apiKey ? `${API_BASE_URL}/torrents/mylist` : null,
        fetcher,
        {
            shouldRetryOnError: false,
            revalidateIfStale: true,
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
        }
    );

    return {
        torrents: data,
        isLoading,
        isError: error,
    };
};

export default fetchTorrents;
