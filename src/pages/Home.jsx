import TorrentCard from "../components/TorrentCard";
import "../css/Home.css";
import "../css/AddTorrentModal.css";
import { useEffect, useRef, useState } from "react";
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
import AddTorrentModal from "../components/AddTorrentModal";
import useFetchUserIP from "../hooks/useFetchUserIP";

function Home() {
    const [searchQuerry, setSearchQuerry] = useState("");
    // Keep copy of torrents for sorting, deleting etc...
    const [localTorrents, setLocalTorrents] = useState(null);

    const [activeTorrents, setActiveTorrents] = useState(0);
    const [cachedTorrents, setCachedTorrents] = useState(0);
    const [inactiveTorrents, setInactiveTorrents] = useState(0);

    const [lastUpdate, setLastUpdate] = useState("");
    const [timerActive, setTimerActive] = useState(false);

    const dialogRef = useRef();

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
        getAndSaveUserIP();
    }, [])

    async function getAndSaveUserIP() {
        // Save user IP for download links (API uses it to determine closest CDN)
        const userIP = await useFetchUserIP();
        localStorage.setItem("userIP", userIP);
    }

    function setSearchTerm(searchTerm) {
        setSearchQuerry(searchTerm);
    }

    async function deleteTorrentFromList(torrentId) {
        // Immediately remove torrent from users dashboard before API call
        setLocalTorrents(localTorrents.filter((t) => t.id !== torrentId));
        // Mutate torrents with bypass_cache=true to get fresh data
        updateData();
    }

    async function updateData() {
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
        updateData();
        setTimerActive(false);
    }

    useEffect(() => {
        // Only start timer if there are active torrents to update data for
        !timerActive && activeTorrents > 0 && updateDashboardAfterDelay();
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

    useEffect(() => {
        dialogRef.current?.addEventListener("close", closeAddTorrentModal);
        return () => {
            dialogRef.current?.removeEventListener("close", closeAddTorrentModal);
        }
    }, [dialogRef])

    function showAddTorrentModal() {
        dialogRef.current?.showModal();
        document.body.style.overflow = "hidden";
    }

    function closeAddTorrentModal() {
        dialogRef.current?.close();
        document.body.style.overflow = "";
    }

    return (
        <div className="home">
            <NavBar onSearch={setSearchTerm} changeSort={changeSort}
                downloadMagnetLinks={downloadMagnetLinks}
                showAddTorrentModal={showAddTorrentModal} />
            {!isLoading && <div className="home-dashboard-info-wrapper">
                <div className="home-torrents-info-wrapper">
                    <div className="home-torrents-info">
                        <p style={{ color: "cornflowerblue", marginLeft: "2em" }}>
                            <strong>{activeTorrents}</strong>
                        </p>
                        <p> active torrents</p>
                    </div>
                    <div className="home-torrents-info">
                        <p style={{ color: "green", marginLeft: "1.5em" }}>
                            <strong>{cachedTorrents}</strong>
                        </p>
                        <p> cached torrents</p>
                    </div>
                    <div className="home-torrents-info">
                        <p style={{ color: "firebrick", marginLeft: "1.5em" }}>
                            <strong>{inactiveTorrents}</strong>
                        </p>
                        <p> inactive torrents</p>
                    </div>
                </div>
                <div className="home-dashboard-update-info">
                    <p>Last dashboard update: <strong>{lastUpdate}</strong></p>
                </div>
            </div>}
            {isLoading && <div className="home-loader">
                <PacmanLoader color="#fdff00" size={"50px"} />
            </div>}
            {isError && !!toast.error(isError?.info?.detail ? isError?.info?.detail : "Undefined error")}
            <dialog className="add-torrent-dialog" ref={dialogRef}>
                <AddTorrentModal close={closeAddTorrentModal} update={updateData} />
            </dialog>
            <div className="torrents-list-wrapper"><div className="torrents-list">
                {!isError && localTorrents && localTorrents.map((torrent) =>
                    // Only show torrents that contain current search input
                    torrent.name.toLowerCase().includes(searchQuerry.toLowerCase()) &&
                    <TorrentCard apiKey={apiKey} torrent={torrent}
                        onDelete={deleteTorrentFromList} key={torrent.id} />
                )}
            </div></div>
        </div>
    )
}

export default Home
