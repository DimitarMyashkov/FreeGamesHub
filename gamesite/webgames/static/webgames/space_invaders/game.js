let player = new Player(0, 0, 90, 75, 3, enemyBlack2);
let enemy = [];
let numEnemies = 9;


function init() {
    player.x = canvas.width / 2 - 37.5;
    player.y = (canvas.height / 4) * 3;

    for (let i = 0; i < numEnemies; i++) {
        enemy.push(new Enemy(95 + i * (60 + 75), 50, 80, 75, 2, 1));

    }
}

function update() {
    player.move();
    for (let i = 0; i < numEnemies; i++) {
        enemy[i].move();
    }
}

function draw() {
    drawImage(backStars, 0, 0, canvas.width, canvas.height);
    player.draw();
    for (let i = 0; i < numEnemies; i++) {
        enemy[i].draw();
    }
}