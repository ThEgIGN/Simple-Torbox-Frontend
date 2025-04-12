import { useState } from "react";
import { API_BASE_URL } from "../constants/constants";
import useSWR from "swr";

// Grab all user torrents
const useFetchTorrents = (apiKey) => {
    const [bypassCache, setBypassCache] = useState(false);

    const fetcher = async (url) => {
        
        const res = await fetch(`${url}?bypass_cache=${bypassCache}`, {
            headers: {
                Authorization: "Bearer " + apiKey,
            },
        }).then(console.log(bypassCache));

        if (!res.ok) {
            const error = new Error(
                "An error occurred while getting the torrents."
            );
            // Attach extra info to the error object.
            error.info = await res.json();
            error.status = res.status;
            throw error;
        } else {
            // First call of this function (when page renders) is called with bypass_cache=false,
            // but others (ex. mutate()) are called with bypass_cache=true,
            // since we need fresh information from server (torrent is deleted, torrent is added...)
            setBypassCache(true);
        }

        return res.json();
    };

    const { data, error, isLoading, mutate } = useSWR(
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
        mutate,
    };
};

export default useFetchTorrents;
