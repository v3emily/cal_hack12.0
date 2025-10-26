speed = 5;

window.onload=function() {
    canvas = document.getElementById('canvas1');
    ctx = canvas.getContext('2d');
    setInterval(update, 1000/30);
    let player = new Player();
    canvas.addEventListener('keypress', function(event) {
        if (event.key == 'a') {
            player.x += speed;
        } else if (event.key == 'd') {
            player.x -= speed;
        }
    });
}

function gameOver() {

}

function update() {
    // would want to add logic for following circle here
    ctx.fillStyle='black';
    ctx.fillRect(0,0,canvas.width, canvas.width);
    ctx.fillStyle='red';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

class Player {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = 50;
        this.height = 50;
        this.image = new Image();
        this.image.src = 'mar_1.png';
    }
}