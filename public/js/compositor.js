export default class Compositor {
    constructor() {
        this.layers = [];

    }
    //draws each layer to its respective context
    draw(context) {
        this.layers.forEach(layer => {
            layer(context);
        });

    }
}