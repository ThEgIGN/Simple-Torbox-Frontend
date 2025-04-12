function countTorrentStates(torrents) {
    let activeTorrents = 0,
        cachedTorrents = 0,
        inactiveTorrents = 0;
    torrents.forEach((torrent) => {
        if (!!torrent.active) {
            activeTorrents++;
        } else if (!!torrent.cached) {
            cachedTorrents++;
        } else {
            inactiveTorrents++;
        }
    });
    return { activeTorrents, cachedTorrents, inactiveTorrents };
}

export default countTorrentStates;
