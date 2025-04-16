import formatFileSize from "../utils/FormatFileSize";
import formatDate from "../utils/FormatDate";
import formatETA from "./FormatETA";

function formatTorrentInfo(torrent) {
    if (!!torrent.active) {
        if (!torrent.download_state.includes("uploading")) {
            return (
                <div className="torrent-info">
                    <p>
                        Date added:{" "}
                        <strong>{formatDate(torrent.created_at)}</strong>
                    </p>
                    <p>
                        ↓:{" "}
                        <strong>
                            {formatFileSize(torrent.download_speed)}/s
                        </strong>
                    </p>
                    <p>
                        Seeds: <strong>{torrent.seeds}</strong>
                    </p>
                    <p>
                        Peers: <strong>{torrent.peers}</strong>
                    </p>
                    <p>
                        Ratio: <strong>{torrent.ratio}</strong>
                    </p>
                    <p>
                        Progress:{" "}
                        <strong>{Math.round(torrent.progress * 100)}%</strong>
                    </p>
                    <p>
                        ETA: <strong>{formatETA(torrent.eta)}</strong>
                    </p>
                    <p>
                        Size: <strong>{formatFileSize(torrent.size)}</strong>
                    </p>
                </div>
            );
        } else {
            return (
                <div className="torrent-info">
                    <p>
                        Date added:{" "}
                        <strong>{formatDate(torrent.created_at)}</strong>
                    </p>
                    <p>
                        ↑:{" "}
                        <strong>
                            {formatFileSize(torrent.download_speed)}/s
                        </strong>
                    </p>
                    <p>
                        Ratio: <strong>{torrent.ratio}</strong>
                    </p>
                    <p>
                        Size: <strong>{formatFileSize(torrent.size)}</strong>
                    </p>
                </div>
            );
        }
    } else {
        return (
            <div className="torrent-info">
                <p>
                    Date added:{" "}
                    <strong>{formatDate(torrent.created_at)}</strong>
                </p>
                {torrent?.cached_at && (
                    <p>
                        Date cached:{" "}
                        <strong>{formatDate(torrent.cached_at)}</strong>
                    </p>
                )}
                <p>
                    Size: <strong>{formatFileSize(torrent.size)}</strong>
                </p>
            </div>
        );
    }
}

export default formatTorrentInfo;
