import { API_BASE_URL } from "../constants/constants";

async function useAddTorrents(
    apiKey,
    magnetLinks,
    numberOfLinks,
    updateProcessMessage,
    updateResponseMessage
) {
    async function addTorrent(magnet) {
        const body = new FormData();
        body.set("magnet", magnet);
        try {
            const response = await fetch(
                `${API_BASE_URL}/torrents/createtorrent`,
                {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + apiKey,
                    },
                    body,
                }
            );
            const data = await response.json();
            return data.detail;
        } catch (e) {
            return "Unknown error (Probably CORS)";
        }
    }

    let magnets;
    if (numberOfLinks > 1) {
        magnets = magnetLinks.trim().split("\n");
    } else {
        magnets = [magnetLinks];
    }

    const magnetsNumber = magnets.length;
    let resolveProgress = 0;
    let beginLooping = true;
    let message = "";
    let responseMessage = "";

    // This is the only way to force addTorrent to work asynchronously and not sequentially
    // This way, API is only called after previous call has finished
    while (beginLooping) {
        const newMagnet = magnets[resolveProgress].trim();
        responseMessage = "Magnet link skipped";
        message = `Processed ${++resolveProgress}/${magnetsNumber} magnet links...`;
        if (newMagnet && !newMagnet.includes("\n")) {
            responseMessage = await addTorrent(newMagnet);
        }
        updateProcessMessage(message);
        updateResponseMessage(responseMessage);
        beginLooping = resolveProgress === magnetsNumber ? false : true;
    }
}

export default useAddTorrents;
