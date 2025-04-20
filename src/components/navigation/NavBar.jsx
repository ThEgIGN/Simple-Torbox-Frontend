import { Link, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { useSWRConfig } from "swr";
import "../../css/NavBar.css";
import "../../css/DropdownComponents.css";
import NavItem from "./NavItem";
import DropdownMenu from "./DropdownMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactComponent as STFLogo } from "../../icons/reshot-icon-screen-9M3SDKFZCN.svg";
import SortButton from "./SortButton";
import useFetchUserInfo from "../../hooks/useFetchUserInfo";
import { toast } from "sonner";
import formatFileSize from "../../utils/FormatFileSize";
import formatUserPlan from "../../utils/FormatUserPlan";
import NavItemNoDropdown from "./NavItemNoDropdown";

function NavBar({ onSearch, changeSort, downloadMagnetLinks, showAddTorrentModal }) {
    const location = useLocation();
    const navigate = useNavigate();
    const { mutate } = useSWRConfig();;

    const [searchTerm, setSearchTerm] = useState("");

    const localStorageSort = localStorage.getItem("torrentsSortingMethod");
    const [selectedSort, setSelectedSort] = useState(localStorageSort ? localStorageSort : "↓ Date Added");

    const [userMail, setUserMail] = useState("");
    const [userPlan, setUserPlan] = useState("");
    const [userDataDownloaded, setUserDataDownloaded] = useState(0);
    const [userDataUploaded, setUserDataUploaded] = useState(0);
    const [userTorrentsDownloaded, setUserTorrentsDownloaded] = useState(0);

    function onSelectSort(sortName) {
        if (selectedSort === sortName) return;
        setSelectedSort(sortName);
        changeSort(sortName);
    }

    useEffect(() => {
        const storedKey = localStorage.getItem("torboxApiKey");
        if (storedKey) {
            fetchUserInfo(storedKey);
        }
    }, [])

    async function fetchUserInfo(apiKey) {
        const { success, error, data } = await useFetchUserInfo(apiKey);
        if (success) {
            updateUserData(data);
        } else {
            toast.error(error);
        }
    }

    function updateUserData(data) {
        setUserMail(data.email);
        setUserPlan(formatUserPlan(data.plan));
        setUserDataDownloaded(formatFileSize(data.total_bytes_downloaded));
        setUserDataUploaded(formatFileSize(data.total_bytes_uploaded));
        setUserTorrentsDownloaded(data.torrents_downloaded);
    }

    // Once user logs out, clear SWR fetched data,
    // so when next user logs in, they don't see previous users data for couple of seconds
    function clearSWRCache() {
        mutate(
            key => true, // which cache keys are updated
            undefined, // update cache data to undefined
            { revalidate: false } // do not revalidate
        )
    }

    function handleLogout() {
        localStorage.setItem("torboxApiKey", "");
        clearSWRCache();
        navigate("/");
    }

    // Don't display navigation bar on login page 
    if (location.pathname === "/") {
        return <></>
    } else {
        return <nav className="navbar">
            <div className="navbar-title-and-logo">
                <div className="navbar-logo"><Link to="/dashboard"><STFLogo /></Link></div>
                <h2>STF Dashboard</h2>
            </div>
            <ul className="navbar-nav">
                <NavItemNoDropdown icon={<FontAwesomeIcon icon={"plus"} />}
                    function={showAddTorrentModal} />
                <NavItem icon={<FontAwesomeIcon icon={"magnifying-glass"} />}>
                    <DropdownMenu single="true">
                        <div className="search-input-wrapper">
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search for your torrents..."
                                className="search-input"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    onSearch(e.target.value);
                                }}
                            />
                        </div>
                    </DropdownMenu>
                </NavItem>
                <NavItem icon={<FontAwesomeIcon icon={"sort"} />}>
                    <DropdownMenu width={"200px"}>
                        <div className="sort-torrents-header" header={"true"}><p>Sort torrents:</p></div>
                        <SortButton sortName={"↑ Torrent Name"}
                            active={selectedSort === "↑ Torrent Name"} onSelect={onSelectSort} />
                        <SortButton sortName={"↓ Torrent Name"}
                            active={selectedSort === "↓ Torrent Name"} onSelect={onSelectSort} />
                        <SortButton sortName={"↑ Torrent Size"}
                            active={selectedSort === "↑ Torrent Size"} onSelect={onSelectSort} />
                        <SortButton sortName={"↓ Torrent Size"}
                            active={selectedSort === "↓ Torrent Size"} onSelect={onSelectSort} />
                        <SortButton sortName={"↑ Date Added"}
                            active={selectedSort === "↑ Date Added"} onSelect={onSelectSort} />
                        <SortButton sortName={"↓ Date Added"}
                            active={selectedSort === "↓ Date Added"} onSelect={onSelectSort} />
                    </DropdownMenu>
                </NavItem>
                <NavItem icon={<FontAwesomeIcon icon={"user"} />}>
                    <DropdownMenu width={"300px"}>
                        <div className="user-info-header" header={"true"}>
                            <p><strong>{userMail}</strong></p>
                        </div>
                        <div className="user-info-param" header={"true"}>
                            <p>Plan: <strong>{userPlan}</strong></p>
                        </div>
                        <div className="user-info-param" header={"true"}>
                            <p>Total data downloaded: <strong>{userDataDownloaded}</strong></p>
                        </div>
                        <div className="user-info-param" header={"true"}>
                            <p>Total data uploaded: <strong>{userDataUploaded}</strong></p>
                        </div>
                        <div className="user-info-param" header={"true"}>
                            <p>Total torrents downloaded: <strong>{userTorrentsDownloaded}</strong></p>
                        </div>
                        <div className="user-info-button" onClick={downloadMagnetLinks}>
                            <p>Download magnet links</p>
                        </div>
                        <div className="user-info-button" onClick={() => handleLogout()}>
                            <p>Logout</p>
                        </div>
                    </DropdownMenu>
                </NavItem>
            </ul>
        </nav>
    }
}

export default NavBar