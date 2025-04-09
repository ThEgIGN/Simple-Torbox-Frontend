import TorrentCard from "../components/TorrentCard"
import "../css/Home.css"
import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import fetchTorrents from "../hooks/useFetchTorrents";
import { PacmanLoader } from "react-spinners";
import { toast } from 'sonner'

function Home() {
    const [searchQuerry, setSearchQuerry] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const stateApiKey = location?.state?.stateApiKey;

    // If user was directed to this page from login, grab API key from state
    const [apiKey, setApiKey] = useState(stateApiKey === null ? "" : stateApiKey);

    const { torrents, isLoading, isError } = fetchTorrents(apiKey);

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

    const handleTorrentSearch = (e) => {
        // Stops page from refreshing after every search
        e.preventDefault()
    }

    return (
        <div className="home">
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
                {!isError && torrents && torrents?.data.map((torrent) =>
                    // Only show torrents that contain current search input
                    torrent.name.toLowerCase().includes(searchQuerry) &&
                    <TorrentCard apiKey={apiKey} torrent={torrent} key={torrent.id} />
                )}
            </div>
        </div>
    )
}

export default Home
