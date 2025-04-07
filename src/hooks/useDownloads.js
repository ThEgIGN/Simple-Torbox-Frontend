import { API_BASE_URL } from "../constants/constants";
import useSWR from "swr";

// Grab all user torrents
const fetchTorrents = (apiKey) => {
    const fetcher = (url) =>
        fetch(url, {
            headers: {
                Authorization: "Bearer " + apiKey,
            },
        }).then((res) => res.json());

    const { data, error, isLoading } = useSWR(
        apiKey ? `${API_BASE_URL}/torrents/mylist` : null,
        fetcher
    );

    return {
        torrents: data,
        isLoading,
        isError: error,
    };
};

export default fetchTorrents;
