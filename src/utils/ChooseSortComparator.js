function chooseSortComparator(sortingMethodNavBar = "") {
    // Default comparator arranges torrents in order of: active -> cached -> inactive
    const defaultSortComparator = function (a, b) {
        // If both torrents are active, immediately leave comparator,
        // so torrents get sorted by user choice, and not by cached status
        if (!!b.active && !!a.active) return 0;
        if (!!b.active) return 1;
        if (!!a.active) return -1;

        return !!b.cached - !!a.cached;
    };

    let userSortComparator;
    // If user called sort from NavBar, don't check local storage
    const sortingMethod = sortingMethodNavBar
        ? sortingMethodNavBar
        : localStorage.getItem("torrentsSortingMethod");

    const collator = new Intl.Collator(undefined, {
        sensitivity: "base",
    });
    if (sortingMethod) {
        // Ignore case during sort
        // All sorting methods use default comparator and one chosen by user
        switch (sortingMethod) {
            case "↑ Torrent Name":
                userSortComparator = function (a, b) {
                    return collator.compare(a.name, b.name);
                };
                break;
            case "↓ Torrent Name":
                userSortComparator = function (a, b) {
                    return collator.compare(b.name, a.name);
                };
                break;
            case "↑ Torrent Size":
                userSortComparator = function (a, b) {
                    return a.size - b.size;
                };
                break;
            case "↓ Torrent Size":
                userSortComparator = function (a, b) {
                    return b.size - a.size;
                };
                break;
            case "↑ Date Added":
                userSortComparator = function (a, b) {
                    return collator.compare(a.created_at, b.created_at);
                };
                break;
            default:
                userSortComparator = function (a, b) {
                    return collator.compare(b.created_at, a.created_at);
                };
        }
    } else {
        // Return default one (dateDescending) if user hasn't chosen sorting method yet
        userSortComparator = function (a, b) {
            return collator.compare(b.created_at, a.created_at);
        };
    }
    const sortComparator = function (a, b) {
        return defaultSortComparator(a, b) || userSortComparator(a, b);
    };
    return sortComparator;
}

export default chooseSortComparator;
