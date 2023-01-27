export function timestampToRelative(previous: Date | number, current: Date = new Date()) {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    const elapsed = current.valueOf() - previous.valueOf();

    if (elapsed < msPerMinute) {
        return "just now"
    }

    else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + 'min ago';
    }

    else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + 'h ago';
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed / msPerDay) + 'd ago';
    }

    else if (elapsed < msPerYear) {
        const x = Math.round(elapsed / msPerMonth)
        return x + `month${x > 1 ? 's' : ''} ago`;
    }

    else {
        const x = Math.round(elapsed / msPerMonth)
        return x + `year${x > 1 ? 's' : ''} ago`;
    }
}

