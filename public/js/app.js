import SpriteSheet from './SpriteSheet.js';
import {loadImage, loadScreen} from './loaders.js';


const canvas = document.getElementById('mainscreen');
const context = canvas.getContext('2d');


//CANVAS CONSTANTS
//const grid_bg = new Image();
//grid_bg.src = 'grid.png';

const sonicBlue = new Image();
sonicBlue.src = 'sonics/sonicblue.png';

const sonicRed = new Image();
sonicRed.src = 'sonics/sonicred.png';

const sonicYellow = new Image();
sonicYellow.src = 'sonics/sonicyellow.png';


window.onload = function (e)
{
    loadImage('/gfx/grid.png')
    .then(img => {
        context.drawImage(img, 0, 0);
    });
    /// TEST    
    loadImage('gfx/sonics.png')
    .then(image => {
    const sprites = new SpriteSheet(image, 16, 24);
    sprites.define('sonicBlue', 0, 0);
    sprites.draw('sonicBlue', context, 12, 12);
})
    update();
    
}

const blu = 0;
const red = 1;
const yel = 2;

//pixel lengths of sonic objects
const sonHeight = 24;
const sonWidth = 16;

const sonicColors = [
    sonicBlue,
    sonicRed,
    sonicYellow,
];

let currentXPos = 0;
let currentYPos = 0;
let offset_x = 0;
let offset_y = 0;


//PIECES
const piece_BBBB = [
    [sonicColors[blu], sonicColors[red], sonicColors[yel], sonicColors[blu]],
    [sonicColors[blu], sonicColors[blu], sonicColors[blu], sonicColors[blu]],
    [sonicColors[blu], sonicColors[blu], sonicColors[blu], sonicColors[blu]],
    [sonicColors[blu], sonicColors[blu], sonicColors[blu], sonicColors[blu]]
];

const piece_BBBR = [
    [sonicColors[blu], sonicColors[blu], sonicColors[blu], sonicColors[red]],
    [sonicColors[blu], sonicColors[blu], sonicColors[red], sonicColors[blu]],
    [sonicColors[blu], sonicColors[red], sonicColors[blu], sonicColors[blu]],
    [sonicColors[red], sonicColors[blu], sonicColors[blu], sonicColors[blu]],
];

const piece_BBRR = [
    [sonicColors[blu], sonicColors[blu], sonicColors[red], sonicColors[red]],
    [sonicColors[blu], sonicColors[red], sonicColors[red], sonicColors[blu]],
    [sonicColors[red], sonicColors[red], sonicColors[blu], sonicColors[blu]],
    [sonicColors[red], sonicColors[blu], sonicColors[blu], sonicColors[red]],
];

const allPieces = [piece_BBBB, piece_BBBR, piece_BBRR];


let currentPiece = allPieces[0][0]; // allPieces[0][0] = first element(piece_BBBB), first rotation
let flag = 0;

const sonicBlock = {
    pos_Offset: {x: 0, y: 0},
    blockOnScreen: currentPiece,
}

function placeX() {
    if ((flag === 2) || (flag === 4)) {
        currentXPos+= sonWidth;
    } else currentXPos = 0;
    
    return currentXPos;
}

function placeY() {
    if ((flag === 3) || (flag === 4)) {
        currentYPos+= 12; //amount needed so bottom pieces align with top pieces' chins
    } else currentYPos = 0;
    
    return currentYPos;
}

function draw () {
    drawPiece(sonicBlock.blockOnScreen, sonicBlock.pos_Offset);
}

function drawPiece(block, offset) {
    //for each element, get its index and do~
    currentPiece.forEach((element, index) => { 
        
        flag+=1;
        currentXPos = placeX();
        currentYPos = placeY();
        context.drawImage(currentPiece[index], currentXPos + offset.x, currentYPos + offset.y);
        currentXPos = 0;
        currentYPos = 0;

    })
}

function update() {
    draw();
    getAniFrame(update);
}
