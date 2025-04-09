function formatDownloadState(activeState, downloadState, cachedState) {
    let color = "green";
    let state = "Cached";

    if (activeState) {
        state = downloadState;
        state =
            state.length > 1
                ? state[0].toUpperCase() + state.slice(1)
                : "Unavailable";
        color =
            downloadState === "downloading" ? "cornflowerblue" : "darkgoldenrod";
    } else if (!cachedState) {
        color = "firebrick";
        state = "Inactive";
    }

    return (
        <p style={{ backgroundColor: color }}>
            <strong>{state}</strong>
        </p>
    );
}

export default formatDownloadState;
