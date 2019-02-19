export function objToQueryString(obj) {
    const keyValues = [];
    for (const key in obj) {
        keyValues.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
    return keyValues.join('&');
}
