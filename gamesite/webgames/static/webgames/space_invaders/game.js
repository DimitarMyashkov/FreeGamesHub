let player = new Player(0, 0, 90, 75, 3, enemyBlack2);
let enemies = [];
let numEnemies = 9, dirEnemies = 1;

function moveEnemies() {
    if (enemies[numEnemies - 1].x > canvas.width - 150) {
        dirEnemies *= -1;
    } else if (enemies[0].x < 90) {
        dirEnemies *= -1;
    }

    for (let i = 0; i < numEnemies; i++) {
        enemies[i].x += enemies[i].speed * dirEnemies;
    }
}

function init() {
    player.x = canvas.width / 2 - 37.5;
    player.y = (canvas.height / 4) * 3;

    for (let i = 0; i < numEnemies; i++) {
        enemies.push(new Enemy(95 + i * (60 + 75), 50, 80, 75, 2, randomInteger(4) + 1));

    }
}

function update() {
    // console.log(dirEnemies);
    player.move();
    moveEnemies();
}

function draw() {
    drawImage(backStars, 0, 0, canvas.width, canvas.height);
    player.draw();
    for (let i = 0; i < numEnemies; i++) {
        enemies[i].draw();
    }
}