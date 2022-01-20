export function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.onload = () => {
            resolve(image);
        };
        image.src = url;
    })
}

export function loadScreen(name){
    return fetch('/board/${name}.json')
    .then(r => r.json());
}