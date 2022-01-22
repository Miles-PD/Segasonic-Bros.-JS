import {loadImage} from './loaders.js';

export function drawBoardGfx(boardGfx, context, graphic) {
    boardGfx.drawpos.forEach(([x, y]) => {
        loadImage(`/gfx/${graphic}.png`)
        .then(img => {
            context.drawImage(img, x, y);
        });

    })
}


// composites individual layers for one final screen

// graphicClass for board = boardGfx
// 'graphic' for board = board.graphic
export function createLayer(graphicClass, graphic) {
    const screenBuffer = document.createElement('canvas');
    screenBuffer.width = 320;
    screenBuffer.height = 224;
    graphicClass.forEach(board => {
        drawBoardGfx(board, screenBuffer.getContext('2d'), board.graphic)
    });

    return function drawLayer(context) {
        context.drawImage(screenBuffer, 0, 0);
    };
}