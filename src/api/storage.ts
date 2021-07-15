import {completeUrl} from "@/api/utils"

function setCookie(name: string, value: string, remember: boolean) {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 10);
    const exp = remember ? "; expires=" + date.toUTCString() : "";

    document.cookie = name + "=" + value + exp + "; path=/";
}

function getCookie(name: string) {
    name += "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function deleteCookie(name: string) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export function getSessionId(): string {
    return getCookie("sessionId");
}

export function setSessionId(sessionId: string, remember: boolean) {
    setCookie("sessionId", sessionId, remember);
}

export function isAuthenticated(): boolean {
    console.log(getSessionId());
    return getSessionId() != "";
}

export function deleteSessionId(): void {
    deleteCookie("sessionId");
}

export function getServerAddress(): string {
    const cookieAddress: string = getCookie("serverAddress");
    if (cookieAddress == "") {
        return window.location.origin;
    }
    return cookieAddress;
}

export function setServerAddress(url: string): void {
    setCookie("serverAddress", completeUrl(url), true);
}