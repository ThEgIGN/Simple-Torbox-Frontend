import "../css/TorrentCard.css"
import { FaRegTrashAlt } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useState } from "react";
import TorrentFileCard from "./TorrentFileCard";
import formatDownloadState from "../utils/formatDownloadState";
import useDeleteTorrent from "../hooks/useDeleteTorrent";
import { toast } from "sonner";
import formatTorrentInfo from "../utils/FormatTorrentInfo";

function TorrentCard({ apiKey, torrent, onDelete }) {
    const [showTorrentFiles, setShowTorrentFiles] = useState(false);
    // Once user shows files, animation for fadding them in starts playing. Problem appears when
    // files grabbed by API aren't sorted by their ids, so random files start fading in
    // This fixes that problem by manually setting id and sorting files by it
    let fileIdSorted = 0;

    function expandTorrent() {
        // Only show torrent files if torrent is cached on a server (no inactive torrents, no torrents downloading...)
        if (!!!torrent.cached) return;
        setShowTorrentFiles(!showTorrentFiles);
    }

    async function deleteTorrent() {
        const loadingToastId = toast.loading("Your torrent is being deleted...");
        const { success, detail } = await useDeleteTorrent(apiKey, torrent.id);
        if (success) {
            toast.success("Torrent has been deleted", { id: loadingToastId });
            onDelete(torrent.id);
        } else {
            toast.error(detail, { id: loadingToastId });
        }
    }

    function deleteTorrentHelper() {
        // If user click on secondary delete button, remove previous toast
        toast.dismiss();
        const toastId = toast.warning(`Are you sure you want to delete ${torrent.name}?`, {
            duration: Infinity,
            cancel: { label: "No", onClick: () => toast.dismiss(toastId) },
            action: { label: "Yes", onClick: () => deleteTorrent() },
        });
    }

    return (
        <div className="torrent-wrapper">
            <div className={!!torrent.active || !!torrent.cached ?
                "torrent-card" : "torrent-card-inactive"}>
                <div className={(!!torrent.active && torrent.progress < 1) ?
                    "torrent-box-downloading" : "torrent-box"} onClick={expandTorrent}
                    style={{ "--n": `${Math.round(torrent.progress * 100)}%` }}>
                    <div className="torrent-availability-and-name">
                        <div className="torrent-name">
                            <h2>{torrent.name}</h2>
                        </div>
                        <div className="torrent-availability">
                            {formatDownloadState(!!torrent.active, torrent.download_state, !!torrent.cached)}
                        </div>
                    </div>
                    {formatTorrentInfo(torrent)}
                </div>
                <div className="torrent-delete-button" onClick={deleteTorrentHelper}>
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
