import * as htmlToImage from "html-to-image";

/** @type {import('./$types').LayoutLoad} */

export function retrieveLastData() {
    const lastItem = localStorage.getItem("last-item")
    return JSON.parse(lastItem);
}

export function storageLastData(obj) {
    const myJSON = JSON.stringify(obj);
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
