function formatETA(timeLeft) {
    const units = [
        [1, "second"],
        [60, "minute"],
        [60 * 60, "hour"],
        [60 * 60 * 24, "day"],
        [60 * 60 * 24 * 30, "month"],
        [60 * 60 * 24 * 30 * 12, "year"],
    ];

    let bestUnit = units[0];
    for (const unit of units) {
        if (timeLeft >= unit[0]) {
            bestUnit = unit;
        }
    }
    const [divisor, label] = bestUnit;
    return `${Math.floor(timeLeft / divisor)} ${label}${
        divisor > 1 ? "s" : ""
    }`;
}

export default formatETA;
