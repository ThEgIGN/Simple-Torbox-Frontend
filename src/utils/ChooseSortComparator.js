function chooseSortComparator(sortingMethodNavBar = "") {
    // Default comparator arranges torrents in order of: active -> cached -> inactive
    const defaultSortComparator = function (a, b) {
        return !!b.active - !!a.active || !!b.cached - !!a.cached;
    };

    let userSortComparator;
    // If user called sort from NavBar, don't check local storage
    const sortingMethod = sortingMethodNavBar
        ? sortingMethodNavBar
        : localStorage.getItem("torrentsSortingMethod");

    if (sortingMethod) {
        // All sorting methods use default comparator and one chosen by user
        switch (sortingMethod) {
            case "torrentNameAscending":
                userSortComparator = function (a, b) {
                    return a.name.localeCompare(b.name);
                };
                break;
            case "torrentNameDescending":
                userSortComparator = function (a, b) {
                    return b.name.localeCompare(a.name);
                };
                break;
        }
    } else {
        // Return default one (nameAsending) if user hasn't chosen sorting method yet
        userSortComparator = function (a, b) {
            return a.name.localeCompare(b.name);
        };
    }
    const sortComparator = function (a, b) {
        return defaultSortComparator(a, b) || userSortComparator(a, b);
    };
    return sortComparator;
}

export default chooseSortComparator;
