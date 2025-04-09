function formatDate(date) {
    try {
        const formattedDate = new Intl.DateTimeFormat("en-GB").format(
            Date.parse(date)
        );
        return formattedDate;
    } catch (e) {
        return "";
    }
}

export default formatDate;
