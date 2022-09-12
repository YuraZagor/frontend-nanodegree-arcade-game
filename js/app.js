class Animate {
    constructor(x, y, sprite){
        this.x = x;
        this.y = y;
        this.sprite=sprite;
    };
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };    
}

let allEnemies = []
let allSpeeds = [100, 200, 300]
let rangeY = [73, 156, 239]

class Enemy extends Animate {
    constructor(x, y, sprite, speedX) {
        super(x, y, sprite);
        this.speedX = speedX;
    }
    update = function(dt) {
        this.x += this.speedX * dt;           
    }

}
Enemy.prototype.checkCollision = function() {
    if ((this.x < player.x)  &&  (player.x - this.x < 30 )){
        if (player.y === this.y){
            console.log("Ooooops!")
        }
    }   
}

function addBug() {
    rangeY.forEach (
        (levelMark)=>  allEnemies.push( new Enemy(0, levelMark, 'images/enemy-bug.png', allSpeeds[Math.floor(Math.random()*3)] )) 
    )       
}
addBug()
setInterval(() => addBug(), 3000)



class Player extends Animate {
    constructor(x, y, sprite) {
        super(x, y, sprite);
    }
    backToStart(){
        this.x = 202;
        this.y = 405;
    }
    update = function() {
        if (this.y < 0){
           this.backToStart()
        }
    };
}

let player = new Player(202, 405, 'images/char-boy.png')


Player.prototype.handleInput = function (direction) {
    switch (direction) {
        case 'left':
            if (this.x > 0){
                this.x -= 101 };
                break;
        case 'up':
            this.y -= 83;
            break;
        case 'right':
            if (this.x < 400){
                this.x += 101};
                break;
        case 'down':
            if (this.y < 400){
                this.y += 83 };
            break;
        default:
            break;
    };        
} 

document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
})
