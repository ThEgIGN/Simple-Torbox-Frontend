import "../css/TorrentFileCard.css"
import { IoMdDownload } from "react-icons/io";
import { IoCopyOutline } from "react-icons/io5";
import { IconContext } from "react-icons";
import formatFileSize from "../utils/FormatFileSize";
import { API_BASE_URL_NO_PROXY } from "../constants/constants";
import { toast } from "sonner";
import useFetchDownloadLink from "../hooks/useFetchDownloadLink";

function TorrentFileCard({ apiKey, torrentId, file, fileIdSorted }) {
    function downloadFile() {
        const downloadLink = `${API_BASE_URL_NO_PROXY}/torrents/requestdl?token=${apiKey}\
&torrent_id=${torrentId}&file_id=${file.id}&redirect=true`;
        window.open(downloadLink, "_self");
        toast.success("Your download should start in a few seconds!");
    }

    async function getDownloadLink() {
        const loadingToastId = toast.loading("Your download link is getting ready...");
        const userIP = localStorage.getItem("userIP");
        const { success, error, link } = await useFetchDownloadLink(apiKey, torrentId, file.id, userIP);
        if (success) {
            toast.info("Successfully grabbed link! Please press button to copy it to clipboard.",
                {
                    action: { label: "COPY", onClick: () => copyDownloadLink(link, loadingToastId) },
                    id: loadingToastId,
                    duration: Infinity,
                });
        } else {
            toast.error(error, { id: loadingToastId });
        }
    }

    async function copyDownloadLink(link) {
        try {
            await navigator.clipboard.writeText(link);
            toast.success("Successfully copied download link to the clipboard!");
        } catch (err) {
            toast.error("Failed to copy link!");
        }
    }

    return (
        <div className="file-wrapper">
            <div className="file-card" style={{ "--n": fileIdSorted }}>
                <div className="file-box">
                    <div className="file-name">
                        <h3>{file.short_name}</h3>
                    </div>
                    <div className="file-info">
                        <p>Size: <strong>{formatFileSize(file.size)}</strong></p>
                    </div>
                </div>
                <div className="file-copy-button" onClick={getDownloadLink}>
                    <IconContext.Provider value={{ color: "white", size: "1.8em" }}>
                        <div><IoCopyOutline /></div>
                    </IconContext.Provider>
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