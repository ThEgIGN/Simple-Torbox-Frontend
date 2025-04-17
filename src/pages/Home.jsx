import TorrentCard from "../components/TorrentCard";
import "../css/Home.css";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useFetchTorrents from "../hooks/useFetchTorrents";
import { PacmanLoader } from "react-spinners";
import { toast } from 'sonner';
import countTorrentStates from "../utils/CountTorrentStates";
import chooseSortComparator from "../utils/ChooseSortComparator";
import { DASHBOARD_UPDATE_DELAY_IN_SECONDS } from "../constants/constants";
import { DateTime } from "luxon";
import NavBar from "../components/navigation/NavBar";
import downloadMagnetLinksToFile from "../utils/DownloadMagnetLinksToFile";

function Home() {
    const [searchQuerry, setSearchQuerry] = useState("");
    // Keep copy of torrents for sorting, deleting etc...
    const [localTorrents, setLocalTorrents] = useState(null);

    const [activeTorrents, setActiveTorrents] = useState(0);
    const [cachedTorrents, setCachedTorrents] = useState(0);
    const [inactiveTorrents, setInactiveTorrents] = useState(0);

    const [lastUpdate, setLastUpdate] = useState("");
    const [timerActive, setTimerActive] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const stateApiKey = location?.state?.stateApiKey;

    // If user was directed to this page from login, grab API key from state
    const [apiKey, setApiKey] = useState(stateApiKey === null ? "" : stateApiKey);

    const { torrents, isLoading, isError, mutate } = useFetchTorrents(apiKey);

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

    function setSearchTerm(searchTerm) {
        setSearchQuerry(searchTerm);
    }

    async function deleteTorrentFromList(torrentId) {
        // Immediately remove torrent from users dashboard before API call
        setLocalTorrents(localTorrents.filter((t) => t.id !== torrentId));
        // Mutate torrents with bypass_cache=true to get fresh data
        await mutate();
        setLastUpdate(DateTime.now().toFormat("HH:mm:ss"));
    }

    useEffect(() => {
        if (torrents && torrents?.data) {
            sortTorrents(true);
            const { active, cached, inactive } = countTorrentStates(torrents.data);
            setActiveTorrents(active);
            setCachedTorrents(cached);
            setInactiveTorrents(inactive);
            setLastUpdate(DateTime.now().toFormat("HH:mm:ss"));
        }
    }, [torrents])

    const waitInSeconds = secs => new Promise(resolve => setTimeout(resolve, secs * 1000));

    async function updateDashboardAfterDelay() {
        setTimerActive(true);
        await waitInSeconds(DASHBOARD_UPDATE_DELAY_IN_SECONDS);
        //await mutate();
        setLastUpdate(DateTime.now().toFormat("HH:mm:ss"));
        setTimerActive(false);
    }

    useEffect(() => {
        // Only start timer if there are active torrents to update data for
        //!timerActive && activeTorrents > 0 && updateDashboardAfterDelay();
    }, [activeTorrents, timerActive])

    function sortTorrents(firstRender = false, sortingMethod = "") {
        // First sort goes through fresh data fetched from API, every other sort sorts local data
        const sortedTorrents = firstRender ?
            [...torrents.data.sort(chooseSortComparator())] :
            [...localTorrents.sort(chooseSortComparator(sortingMethod))];
        setLocalTorrents(sortedTorrents);
    }

    function changeSort(sortingMethod) {
        localStorage.setItem("torrentsSortingMethod", sortingMethod);
        sortTorrents(sortingMethod);
    }

    function downloadMagnetLinks() {
        downloadMagnetLinksToFile(localTorrents);
    }

    return (
        <div className="home">
            <NavBar onSearch={setSearchTerm} changeSort={changeSort}
                downloadMagnetLinks={downloadMagnetLinks} />
            <p>{`${activeTorrents} ${cachedTorrents} ${inactiveTorrents} ${lastUpdate}`}</p>
            <PacmanLoader loading={isLoading} />
            <div>
                {isError && !!toast.error(isError?.info?.detail ? isError?.info?.detail : "Undefined error")}
            </div>
            <div className="torrents-list">
                {!isError && localTorrents && localTorrents.map((torrent) =>
                    // Only show torrents that contain current search input
                    torrent.name.toLowerCase().includes(searchQuerry.toLowerCase()) &&
                    <TorrentCard apiKey={apiKey} torrent={torrent} onDelete={deleteTorrentFromList} key={torrent.id} />
                )}
            </div>
        </div>
    )
}

export default Home
