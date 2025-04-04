function TorrentCard({ torrent }) {
    function expandTorrent() {
        alert("clicked")
    }

    function deleteTorrent() {
        alert("deleted")
    }

    return (
        <div className="torrent-card">
            <div className="torrent-box" onClick={expandTorrent}>
                <div className="torrent-name">
                    <h2>{torrent.title}</h2>
                </div>
                <div className="torrent-info">
                    <p>{torrent.dateAdded}</p>
                    <p>{torrent.dateCached}</p>
                    <p>{torrent.size}</p>
                </div>
            </div>
            <div className="torrent-delete-button" onClick={deleteTorrent}>
                🗑
            </div>
        </div>
    );
}

export default TorrentCard
