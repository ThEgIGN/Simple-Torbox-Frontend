import TorrentCard from "../components/TorrentCard";
import "../css/Home.css";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useFetchTorrents from "../hooks/useFetchTorrents";
import { PacmanLoader } from "react-spinners";
import { toast } from 'sonner';
import countTorrentStates from "../utils/CountTorrentStates";
import chooseSortComparator from "../utils/ChooseSortComparator";

function Home() {
    const [searchQuerry, setSearchQuerry] = useState("");
    // Keep copy of torrents for sorting, deleting etc...
    const [localTorrents, setLocalTorrents] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const stateApiKey = location?.state?.stateApiKey;

    // If user was directed to this page from login, grab API key from state
    const [apiKey, setApiKey] = useState(stateApiKey === null ? "" : stateApiKey);

    const { torrents, isLoading, isError, mutate } = useFetchTorrents(apiKey, false);

    useEffect(() => {
        // If user opened dashboard directly, try to get API key from storage
        if (!apiKey) {
            const storedKey = localStorage.getItem("torboxApiKey");
            if (storedKey) {
                setApiKey(storedKey);
            } else {
                navigate("/");
            }
        }
    }, [])

    async function deleteTorrentFromList(torrentId) {
        // Immediately remove torrent from users dashboard before API call
        setLocalTorrents(localTorrents.filter((t) => t.id !== torrentId));
        // Mutate torrents with bypass_cache=true to get fresh data
        mutate();
    }

    useEffect(() => {
        if (torrents && torrents?.data) {
            sortTorrents(true);
            const { activeTorrents, cachedTorrents, inactiveTorrents } = countTorrentStates(torrents.data);
        }
    }, [torrents])

    const handleTorrentSearch = (e) => {
        // Stops page from refreshing after every search
        e.preventDefault()
    }

    function sortTorrents(firstRender, sortingMethod = "") {
        const sortedTorrents = firstRender ?
            [...torrents.data.sort(chooseSortComparator())] :
            [...localTorrents.sort(chooseSortComparator(sortingMethod))];
        setLocalTorrents(sortedTorrents);
    }

    function changeSort(sortingMethod) {
        localStorage.setItem("torrentsSortingMethod", sortingMethod);
        sortTorrents(false, sortingMethod);
    }

    return (
        <div className="home">
            <button onClick={() => changeSort("torrentNameAscending")}>sortA</button>
            <button onClick={() => changeSort("torrentNameDescending")}>sortD</button>
            <form onSubmit={handleTorrentSearch} className="torrent-search-form">
                <input
                    type="text"
                    placeholder="Search for your torrents..."
                    className="text-input"
                    value={searchQuerry}
                    onChange={(e) => setSearchQuerry(e.target.value)}
                />
            </form>
            <PacmanLoader loading={isLoading} />
            <div>
                {isError && !!toast.error(isError?.info?.detail ? isError?.info?.detail : "Undefined error")}
            </div>
            <div className="torrents-list">
                {!isError && localTorrents && localTorrents.map((torrent) =>
                    // Only show torrents that contain current search input
                    torrent.name.toLowerCase().includes(searchQuerry) &&
                    <TorrentCard apiKey={apiKey} torrent={torrent} onDelete={deleteTorrentFromList} key={torrent.id} />
                )}
            </div>
        </div>
    )
}

export default Home
