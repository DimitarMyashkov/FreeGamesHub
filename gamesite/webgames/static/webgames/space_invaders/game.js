let player = new Player(0, 0, 90, 75, 3, enemyBlack2);
let enemies = [], numEnemies = 8, dirEnemies = 1;
let bullets = [], numBullets = 0;
let updates = 0;

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
        enemies.push(new Enemy(165 + i * (90 + 75), 50, 80, 75, 1, randomInteger(4) + 1));

    }
}

function update() {
    updates++;

    player.move();
    moveEnemies();
    for (let i = 0; i < numBullets; i++) {
        bullets[i].move();
    }
    
    if (updates % 50 == 0) {
        bullets.push(new Bullet(enemies[randomInteger(numEnemies)].x + (enemies[randomInteger(numEnemies)].width / 2 - 5),
                                enemies[randomInteger(numEnemies)].y + (enemies[randomInteger(numEnemies)].height), 10, 25, 2, -1));

        numBullets++;
    }

    for (let i = 0; i < numBullets; i++) {
        for (let j = 0; j < numEnemies; j++) {
            if (bullets[i].collide(enemies[j].x, enemies[j].y, enemies[j].width, enemies[j].height) && bullets[i].type == 1) {
                bullets[i].clear(numBullets);
            }
        }
        if (bullets[i].collide(player.x, player.y, player.width, player.height) && bullets[i].type == -1) {
            bullets[i].clear(numBullets);
        }
    }

    for (let i = 0; i < numBullets; i++) {
        if (bullets[i].y < -bullets[i].height || bullets[i].y > canvas.height) {
            bullets[i].clear(numBullets);
        }
    }
}

function draw() {
    drawImage(backStars, 0, 0, canvas.width, canvas.height);
    player.draw();
    for (let i = 0; i < numEnemies; i++) {
       enemies[i].draw();
    }

    for (let i = 0; i < numBullets; i++) {
        bullets[i].draw();
    }
}

function keyup(key) {
    if (key == 32) {
        bullets.push(new Bullet(player.x + (player.width / 2 - 5), player.y + (player.height / 2 - 50), 10, 25, 2, 1));
        numBullets++;
    }
}
