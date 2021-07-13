import { getSessionId, getServerAddress } from "@/api/storage";

function request(path: string): Promise<any> {
    return fetch(getServerAddress() + "/api/v1/" + path, {
        headers: {
            "X-StoRe-Session": getSessionId(),
        },
    }).then(response => response.json())
}

export function getItems(): Promise<Array<StoRe.Item>> {
    const promise: Promise<Array<StoRe.Item>> = new Promise((resolve, reject) => {
        request("items").then((items: Array<StoRe.Item>) => resolve(items));
    });
    return promise;
}

export function getLocations(): Promise<Array<StoRe.Location>> {
    const promise: Promise<Array<StoRe.Location>> = new Promise((resolve, reject) => {
        request("locations").then((locations: Array<StoRe.Location>) => resolve(locations));
    });
    return promise;
}