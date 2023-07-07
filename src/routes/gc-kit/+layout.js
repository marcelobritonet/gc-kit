import * as htmlToImage from "html-to-image";

/** @type {import('./$types').LayoutLoad} */

export function retrieveLastData() {
    const lastItem = localStorage.getItem("last-item")
    return JSON.parse(lastItem) || [];
}
export function retrieveStorageDataByHash(hash) {
    const storagedItems = localStorage.getItem("last-item")
    const lastItems = JSON.parse(storagedItems);
    return lastItems.find(lastItem => lastItem.hash === hash) || {};
}

export async function storageLastData(obj) {
    const restoredLastData = retrieveLastData()
    const lastData = Array.isArray(restoredLastData) ? restoredLastData : []
    obj.hash = await hash(JSON.stringify(obj))
    const repeted = lastData.find(lastItem => lastItem.hash === obj.hash);
    if(!repeted) {
        const newData = [obj, ...lastData]
        const myJSON = JSON.stringify(newData);
        localStorage.setItem("last-item", myJSON);
        return true
    }
    return false
}

export function deleteStorageDataByHash(hash) {
    const lastData = retrieveLastData() || []
    const newData = lastData.filter(data => data.hash !== hash)
    const myJSON = JSON.stringify(newData);
    localStorage.setItem("last-item", myJSON);
}

export function generate(filename) {
    htmlToImage.toJpeg(document.getElementById('kit'), { quality: 1 })
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = filename;
            link.href = dataUrl;
            link.click();
        });
}

export function capitalizeString(str) {
    const arr = str.split(" ");
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

    }
    return arr.join(" ");
}

async function hash(string) {
    const utf8 = new TextEncoder().encode(string);
    const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray
      .map((bytes) => bytes.toString(16).padStart(2, '0'))
      .join('');
}

export function getFilename(prefix, name, date) {
    return `${prefix} ${capitalizeString(name)} - ${date.toUpperCase()}.jpeg`;
}

export function getGroupIdByRouteId(routeId){
    return routeId.split("/")[1]
}

export function getGroupParamsByRouteId(groupType) {
    switch (groupType) {
        case "27": return {
            prefix: "GC 27+"
        }
        case "27-casais": return {
            prefix: "GC 27+ Casais"
        }
        case "casais": return {
            prefix: "GC Casais"
        }
        case "next": return {
            prefix: "GC Next"
        }
        case "pink": return {
            prefix: "GC Pink"
        }
        case "misto": return {
            prefix: "GC Misto"
        }
        case "nexteen-meninos": return {
            prefix: "GC Nexteen Meninos"
        }
        case "nexteen-meninas": return {
            prefix: "GC Nexteen Meninas"
        }
    }
}
