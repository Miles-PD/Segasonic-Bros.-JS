import {loadImage} from './loaders.js';
import SpriteSheet from './SpriteSheet.js';

export function loadSonics() {
    return loadImage('gfx/sonics.png')
    .then(image => {
    const sprites = new SpriteSheet(image, 16, 24);
    const sonicBlue = sprites.defineTile('sonicBlue', 0, 0, 16, 24);
    const sonicRed = sprites.defineTile('sonicRed', 0, 1, 16, 24);
    const sonicYellow = sprites.defineTile('sonicYellow', 0, 2, 36, 16, 24);
    return sprites;
    })
}