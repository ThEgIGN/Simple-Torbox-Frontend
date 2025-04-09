import "../css/TorrentCard.css"
import { FaRegTrashAlt } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useState } from "react";
import TorrentFileCard from "./TorrentFileCard";
import formatFileSize from "../utils/FormatFileSize";
import formatDate from "../utils/FormatDate";
import formatDownloadState from "../utils/formatDownloadState";

function TorrentCard({ apiKey, torrent }) {
    const [showTorrentFiles, setShowTorrentFiles] = useState(false);
    // Once user shows files, animation for fadding them in starts playing. Problem appears when
    // files grabbed by API aren't sorted by their ids, so random files start fading in
    // This fixes that problem by manually setting id and sorting files by it
    let fileIdSorted = 0;

    function expandTorrent() {
        // Don't show torrent files if the torrent is inactive
        if (!!!torrent.cached) return;
        setShowTorrentFiles(!showTorrentFiles);
    }

    function deleteTorrent() {
        alert("deleted")
    }

    return (
        <div className="torrent-wrapper">
            <div className={!!torrent.cached ? "torrent-card" : "torrent-card-inactive"}>
                <div className="torrent-box" onClick={expandTorrent}>
                    <div className="torrent-name">
                        <h2>{torrent.name}</h2>
                    </div>
                    <div>
                        <span className="torrent-availability">
                            {formatDownloadState(!!torrent.active, torrent.download_state, !!torrent.cached)}
                        </span>
                        <div className="torrent-info">
                            <p>Date added: <strong>{formatDate(torrent.updated_at)}</strong></p>
                            {torrent?.cached_at && <p>Date cached: <strong>{formatDate(torrent.cached_at)}</strong></p>}
                            <p>Size: <strong>{formatFileSize(torrent.size)}</strong></p>
                        </div>
                    </div>
                </div>
                <div className="torrent-delete-button" onClick={deleteTorrent}>
                    <IconContext.Provider value={{ color: "white", size: "1.7em" }}>
                        <div><FaRegTrashAlt /></div>
                    </IconContext.Provider>
                </div>
            </div>
            <div className="torrent-files">{showTorrentFiles && torrent?.files.map((file) =>
                <TorrentFileCard apiKey={apiKey} torrentId={torrent.id} file={file} fileIdSorted={fileIdSorted} key={fileIdSorted++} />
            )}</div>
        </div>
    );
}

export default TorrentCard
