import Compositor from './compositor.js';
import {loadScreen} from './loaders.js';
import {loadSonics} from './sprites.js';
import {createLayer} from './layers.js';



function loadAndDrawScreen() {
    loadScreen('board')
    .then(screen => {
        screen.boardGfx.forEach(board => {
            drawBoardGfx(board, context, board.graphic)
        })
    })
}



const canvas = document.getElementById('mainscreen');
const context = canvas.getContext('2d');



function createSpriteLayer(sprite, pos) {
    return function drawSpriteLayer(context) {
        sprite.draw('sonicBlue', context, pos.currentXPos, pos.currentYPos);
    };
}

const blu = 0;
const red = 1;
const yel = 2;

//pixel lengths of sonic objects
const sonHeight = 24;
const sonWidth = 16;

const sonicColors = [
    'sonicBlue',
    'sonicRed',
    'sonicYellow',
];

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

const sonicPos = {
    currentXPos: 0,
    currentYPos: 0,
    pos_Offset: {x: 0, y: 0},
    blockOnScreen: currentPiece,
};

function placeX() {
    if ((flag === 2) || (flag === 4)) {
        sonicPos.currentXPos+= sonWidth;
    } else sonicPos.currentXPos = 0;
    
    return sonicPos.currentXPos;
}

function placeY() {
    if ((flag === 3) || (flag === 4)) {
        sonicPos.currentYPos+= 12; //amount needed so bottom pieces align with top pieces' chins
    } else sonicPos.currentYPos = 0;
    
    return sonicPos.currentYPos;
}
//sonicBlock.blockOnScreen, sonicBlock.pos_Offset
function drawSonicBlock (block, offset) {
    return function drawPiece(context) {

    //for each element, get its index and do~
    currentPiece.forEach((element, index) => { 
        
        flag+=1;
        sonicPos.currentXPos = placeX();
        sonicPos.currentYPos = placeY();
        //context.drawImage(currentPiece[index], currentXPos + offset.x, currentYPos + offset.y);
        block.draw(currentPiece[index], context, sonicPos.currentXPos + offset.x, sonicPos.currentYPos + offset.y);
        sonicPos.currentXPos = 0;
        sonicPos.currentYPos = 0;

        });
    };
}


//CANVAS CONSTANTS
//const grid_bg = new Image();
//grid_bg.src = 'grid.png';

//const sonicBlue = new Image();
//sonicBlue.src = 'sonics/sonicblue.png';

// sonicRed = new Image();
//sonicRed.src = 'sonics/sonicred.png';

//const sonicYellow = new Image();
//sonicYellow.src = 'sonics/sonicyellow.png';


// Main loop
window.onload = function (e) {

    Promise.all([
        loadSonics(),
        loadScreen('board'),
    ])
    .then(([sonicSprites, screen]) => {

        const compositor = new Compositor();
        const midLayer = createLayer(screen.boardGfx, screen.boardGfx.graphic);
        

        //const sonicSpritesLayer = createSpriteLayer(sonicSprites, sonicPos);
        //compositor.layers.push(sonicSpritesLayer);

        const sonicBlockLayer = drawSonicBlock(sonicSprites, sonicPos.pos_Offset);
        
        compositor.layers.push(midLayer);
        compositor.layers.push(sonicBlockLayer);




    function update() {
        compositor.draw(context);
        sonicPos.currentXPos+=2;
        sonicPos.currentYPos+=2;
        requestAnimationFrame(update);
    }
    update();
    });


   // loadImage('/gfx/grid.png')
   // .then(img => {
   //     context.drawImage(img, 8, 24);
   // });
   // loadImage('/gfx/border.png')
   // .then(img => {
    //    context.drawImage(img, 0, 2);
    //});
    /// TEST    

    
}



