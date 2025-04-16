function countTorrentStates(torrents) {
    let active = 0,
        cached = 0,
        inactive = 0;
    torrents.forEach((torrent) => {
        if (!!torrent.active) {
            active++;
        } else if (!!torrent.cached) {
            cached++;
        } else {
            inactive++;
        }
    });
    return { active, cached, inactive };
}

export default countTorrentStates;
