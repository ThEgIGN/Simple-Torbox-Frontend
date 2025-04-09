import "../css/TorrentFileCard.css"
import { IoMdDownload } from "react-icons/io";
import { IconContext } from "react-icons";
import formatFileSize from "../utils/FormatFileSize";
import { API_BASE_URL_NO_PROXY } from "../constants/constants";
import { toast } from "sonner";

function TorrentFileCard({ apiKey, torrentId, file, fileIdSorted }) {
    function downloadFile() {
        const downloadLink = `${API_BASE_URL_NO_PROXY}/torrents/requestdl?token=${apiKey}\
&torrent_id=${torrentId}&file_id=${file.id}&redirect=true`;
        window.open(downloadLink, "_self");
        toast.success("Your download should start in a few seconds!");
    }

    return (
        <div className="file-wrapper">
            <div className="file-card" style={{"--n":fileIdSorted}}>
                <div className="file-box">
                    <div className="file-name">
                        <h3>{file.short_name}</h3>
                    </div>
                    <div className="file-info">
                        <p>Size: <strong>{formatFileSize(file.size)}</strong></p>
                    </div>
                </div>
                <div className="file-download-button" onClick={downloadFile}>
                    <IconContext.Provider value={{ color: "white", size: "2em" }}>
                        <div><IoMdDownload /></div>
                    </IconContext.Provider>
                </div>
            </div>
        </div>
    );
}

export default TorrentFileCard