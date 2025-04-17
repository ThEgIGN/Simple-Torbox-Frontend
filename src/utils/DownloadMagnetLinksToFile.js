function downloadMagnetLinksToFile(torrents) {
    let torrentMagnets = "";
    const magnetPrefix = "magnet:?xt=urn:btih:";
    const magnetEnd = "\n";

    // When it comes to concating longer strings, .concat() outperforms +=
    torrents.forEach((torrent) => {
        torrentMagnets = torrentMagnets.concat(magnetPrefix);
        torrentMagnets = torrentMagnets.concat(torrent.hash);
        torrentMagnets = torrentMagnets.concat(magnetEnd);
    });

    const element = document.createElement("a");
    const file = new Blob([torrentMagnets], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = "myMagnets.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
}

export default downloadMagnetLinksToFile;
