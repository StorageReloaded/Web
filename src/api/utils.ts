import { Location, Item } from "@/model/model";

export function completeUrl(url: string): string {
    if (url === "")
        return url;

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
    }
    return url;
}

export function countItemsInDatabase(locations: Array<Location>, items: Array<Item>): Map<number, number> {
    const counts: Map<number, number> = new Map();
    const locationsMap: Map<number, Location> = new Map();

    locations.forEach(location => {
        locationsMap.set(location.id, location);
        counts.set(location.database, 0);
    });

    items.forEach(item => {
        const databaseId = locationsMap.get(item.location).database;
        counts.set(databaseId, counts.get(databaseId) + 1);
    });

    return counts;
}