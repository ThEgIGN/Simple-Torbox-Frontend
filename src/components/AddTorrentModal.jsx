import { useEffect, useRef, useState } from "react";
import "../css/AddTorrentModal.css";
import useAddTorrents from "../hooks/useAddTorrents";
import { PacmanLoader } from "react-spinners";

function AddTorrentModal({ close, update }) {
    const [magnetLinks, setMagnetLinks] = useState("");
    const [numberOfLinks, setNumberOfLinks] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingProcessMessage, setLoadingProcessMessage] = useState("");
    const [loadingResponseMessage, setLoadingResponseMessage] = useState("");
    const [countedMagnetsTextColor, setCountedMagnetsTextColor] = useState("rgba(255, 255, 255, 0.87)");
    const insideDialogRef = useRef();

    // g means to get all occurences of pattern, i means case-insensitive
    const magnetRegex = /magnet:\?xt=urn:btih:/gi;

    useEffect(() => {
        function addTorrentHandler(e) {
            if (!insideDialogRef.current) console.log("hi");
            if (!insideDialogRef.current.contains(e.target)) close();
        }
        document.addEventListener("mousedown", addTorrentHandler);
        return () => {
            document.removeEventListener("mousedown", addTorrentHandler);
        }
    }, [insideDialogRef])

    async function handleAddTorrent() {
        if (!magnetLinks || numberOfLinks === 0) {
            flashCountedMagnetLinks();
            return;
        }
        const apiKey = localStorage.getItem("torboxApiKey");
        setIsLoading(true);
        setLoadingProcessMessage("Processing first magnet link");
        await useAddTorrents(apiKey, magnetLinks, numberOfLinks, updateProcessMessage, updateResponseMessage);
        setLoadingProcessMessage("Finished adding all torrents");
        setLoadingResponseMessage("Dashboard updating...");
        await update();
        resetToDefaultValues();
        close();
    }

    const waitInMiliseconds = miliSecs => new Promise(resolve => setTimeout(resolve, miliSecs));

    async function flashCountedMagnetLinks() {
        setCountedMagnetsTextColor("crimson");
        await waitInMiliseconds(600);
        setCountedMagnetsTextColor("rgba(255, 255, 255, 0.87)");
    }

    function resetToDefaultValues() {
        setMagnetLinks("");
        setNumberOfLinks(0);
        setLoadingProcessMessage("");
        setLoadingResponseMessage("");
        setIsLoading(false);
    }

    function updateProcessMessage(message) {
        setLoadingProcessMessage(message);
    }

    function updateResponseMessage(message) {
        setLoadingResponseMessage(message);
    }

    useEffect(() => {
        // Count how many magnet links are there by counting "magnet" in input area
        setNumberOfLinks((magnetLinks.match(magnetRegex) || []).length);
    }, [magnetLinks])

    return (
        <div className="add-torrent" ref={insideDialogRef}>
            <div className="add-torrent-header"><h1>Add your magnet link(s) here</h1></div>
            <div className="add-torrent-header-bottom"><h2>One magnet link per line!</h2></div>
            {!isLoading ?
                <><div className="add-torrent-text-input-wrapper">
                    <textarea
                        className="add-torrent-text-input"
                        type="text"
                        placeholder="Enter your magnet links..."
                        onChange={(e) => setMagnetLinks(e.target.value)}
                    />
                </div>
                    <div className="add-torrent-counter" style={{ color: countedMagnetsTextColor }} >
                        <p>{`Counted magnet links: ${numberOfLinks}`}</p>
                    </div>
                    <div className="add-torrent-buttons-wrapper">
                        <div className="button-wrapper">
                            <button className="add-torrents-button" onClick={() => handleAddTorrent()}>
                                Add torrents
                            </button>
                        </div>
                        <div className="button-wrapper">
                            <button className="add-torrents-button" onClick={close}>Cancel</button>
                        </div>
                    </div></> :
                <><div className="add-torrent-loading">
                    <PacmanLoader color="#fdff00" size={"50px"} />
                </div>
                    <div className="add-torrent-progress-update">
                        <h1>{loadingProcessMessage}</h1>
                    </div>
                    <div className="add-torrent-api-response">
                        <h2>{loadingResponseMessage}</h2>
                    </div></>
            }
        </div >
    );
}

export default AddTorrentModal;