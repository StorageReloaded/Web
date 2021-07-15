export function completeUrl(url: string): string {
    if (url === "")
        return url;

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
    }
    return url;
}