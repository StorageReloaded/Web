import { getSessionId, getServerAddress } from "@/api/storage";
import {Item, Location} from "@/model/model"

function request(path: string): Promise<any> {
    return fetch(getServerAddress() + "/api/v1/" + path, {
        headers: {
            "X-StoRe-Session": getSessionId(),
        },
    }).then(response => response.json())
}

export function getItems(): Promise<Array<Item>> {
    const promise: Promise<Array<Item>> = new Promise((resolve, reject) => {
        request("items").then((items: Array<Item>) => resolve(items));
    });
    return promise;
}

export function getLocations(): Promise<Array<Location>> {
    const promise: Promise<Array<Location>> = new Promise((resolve, reject) => {
        request("locations").then((locations: Array<Location>) => resolve(locations));
    });
    return promise;
}