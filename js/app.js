const allEnemies = [];
const speedLow = 200;
const speedMedium = 275;
const speedHigh = 350;
const allSpeeds = [speedLow, speedMedium, speedHigh];
const enemyRestartX = -55;
const collisionOffset = 40;
const cellX = 101;
const cellY = 83;
const spriteRepositioningY = -10;
const playerStartX = 2*cellX;
const playerStartY = 5*cellY + spriteRepositioningY ;
const fieldWidth = 5*cellX;
const fieldHight = 5*cellY;
const row1 = cellY + spriteRepositioningY;
const row2 = 2*cellY + spriteRepositioningY;
const row3 = 3*cellY + spriteRepositioningY;
const rangesY = [row1, row2, row3];
const bugSprite = 'images/enemy-bug.png';
const playerSprite = 'images/char-boy.png';


function Character (x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite=sprite;
};

Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y) 
};

function Enemy(x, y, sprite, speedX) {
    Character.call(this, x, y, sprite);
    this.speedX = speedX;
};
Enemy.prototype = Object.create(Character.prototype);

Enemy.prototype.update = function(dt){
    this.x += this.speedX * dt;
    if (this.x > fieldWidth){
        this.x = enemyRestartX;
        this.speedX = allSpeeds[Math.floor(Math.random()*3)];
    };
    this.checkColision(player)
};
Enemy.prototype.checkColision = function(checked){    
    if (this.y === checked.y){
        if ((this.x - checked.x < collisionOffset ) && (checked.x - this.x < collisionOffset )) {
            checked.x = playerStartX;
            checked.y = playerStartY;
        };    
    };
};

function addBug() {
    rangesY.forEach ( (levelMark)=>  allEnemies
    .push( new Enemy(0, levelMark, bugSprite, allSpeeds[Math.floor(Math.random()*3)] )) 
    )
};

function Player(x, y, sprite) {
    Character.call(this, x, y, sprite);
};

Player.prototype = Object.create(Character.prototype);

Player.prototype.update = function(dt){
};

Player.prototype.handleInput = function (direction) {
    switch (direction) {
        case 'left':
            if (this.x > 0){
                this.x -= cellX 
            };
            break;
        case 'up':
            this.y -= cellY;
            if(this.y < cellY + spriteRepositioningY){
                this.x = playerStartX;
                this.y = playerStartY;
            }
            break;
        case 'right':
            if (this.x < fieldWidth - cellX ){
                this.x += cellX
            };
            break;
        case 'down':
            if (this.y < fieldHight + spriteRepositioningY ){
                this.y += cellY 
            };
            break;
        default:
            break;
    };        
};

document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
const player = new Player ( playerStartX, playerStartY, playerSprite ); 

addBug()

