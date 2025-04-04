import TorrentCard from "../components/TorrentCard"
import { useState } from "react"

function Home() {
    const [searchQuerry, setSearchQuerry] = useState("")

    const torrents = [
        {
            id: 0,
            title: "Mama Mia",
            dateAdded: "04.04.2025",
            dateCached: "04.03.2025",
            size: "2KB",
        },
        {
            id: 1,
            title: "John Wick",
            dateAdded: "03.04.2025",
            dateCached: "04.03.2025",
            size: "5KB",
        },
        {
            id: 2,
            title: "Spider-Man Part 2",
            dateAdded: "02.01.2025",
            dateCached: "01.01.2025",
            size: "33KB",
        },
        {
            id: 3,
            title: "White Lotus S03",
            dateAdded: "02.02.2025",
            dateCached: "31.11.2024",
            size: "122KB",
        },
        {
            id: 4,
            title: "True Detective S01",
            dateAdded: "17.02.2025",
            dateCached: "12.12.2024",
            size: "1666KB",
        },
    ]

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
                    className="torrent-search-input"
                    value={searchQuerry}
                    onChange={(e) => setSearchQuerry(e.target.value)}
                />
                <button type="submit" className="torrent-search-button">Search</button>
            </form>

            <div className="torrents-list">
                {torrents.map((torrent) =>
                    // Only show torrents that contain current search input
                    torrent.title.toLowerCase().includes(searchQuerry) &&
                    <TorrentCard torrent={torrent} key={torrent.id} />
                )}
            </div>
        </div>
    )
}

export default Home
