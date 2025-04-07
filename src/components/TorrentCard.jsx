import "../css/TorrentCard.css"
import { useState } from "react"
import { useCursor } from "@react-three/drei";
import { FaRegTrashAlt } from "react-icons/fa";
import { IconContext } from "react-icons";

function TorrentCard({ torrent }) {
    function expandTorrent() {
        alert("clicked")
    }

    function deleteTorrent() {
        alert("deleted")
    }

    // Change style of cursor depending on fact if user is hovering over torrent card or not
    const [hovered, setHovered] = useState(false)
    useCursor(hovered)

    return (
        <div className="torrent-card"
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}>
            <div className="torrent-box" onClick={expandTorrent}>
                <div className="torrent-name">
                    <h2>{torrent.name}</h2>
                </div>
                <div className="torrent-info">
                    <p>Date added: <strong>{torrent.updated_at}</strong></p>
                    <p>Date cached: <strong>{torrent?.cached_at}</strong></p>
                    <p>Size: <strong>{torrent.size}</strong></p>
                </div>
            </div>
            <div className="torrent-delete-button" onClick={deleteTorrent}>
                <IconContext.Provider value={{ color: "white", size: "1.7em" }}>
                    <div><FaRegTrashAlt /></div>
                </IconContext.Provider>
            </div>
        </div>
    );
}

export default TorrentCard
