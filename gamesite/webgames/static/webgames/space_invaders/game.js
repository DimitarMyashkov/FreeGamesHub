let player = new Player(0, 0, 90, 75, 3, 10, enemyBlack2);
let enemies = [], numEnemies = 16, dirEnemies = 1;
let bullets = [], numBullets = 0;
let updates = 0;
let pause = false;

function moveEnemies(num) {
    if (num <= 0) {
        return;
    }

    if (enemies[num - 1].x > canvas.width - 150) {
        dirEnemies *= -1;
    } else if (enemies[0].x < 90) {
        dirEnemies *= -1;
    }

    for (let i = 0; i < num; i++) {
        enemies[i].x += enemies[i].speed * dirEnemies;
    }
}

function init() {
    player.x = canvas.width / 2 - 37.5;
    player.y = (canvas.height / 4) * 3;

    for (let i = 0; i < numEnemies; i++) {
        enemies.push(new Enemy(165 + i * (90 + 75), 50, 80, 75, 1, 5, randomInteger(4) + 1, true));
        enemies.push(new Enemy(165 + i * (90 + 75), 185, 80, 75, 1, 5, randomInteger(4) + 1, true));
    }
}

function update() {
    if (!pause) {
        updates++;

        player.move();
        moveEnemies(numEnemies);
        for (let i = 0; i < numBullets; i++) {
            bullets[i].move();
        }

        for (let i = 0; i < numEnemies; i++) {
            if (enemies[i].health <= 0) {
                enemies.splice(i, 1);
                numEnemies--;
            }
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
                    enemies[j].health--;
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
        enemies[i].drawHealth();
        }

        for (let i = 0; i < numBullets; i++) {
            bullets[i].draw();
        }
    }
}

function keyup(key) {
    if (key == 32 && updates >= 40) {
        bullets.push(new Bullet(player.x + (player.width / 2 - 5), player.y + (player.height / 2 - 50), 10, 25, 2, 1));
        numBullets++;
        updates = 0;
    }

    if (key == 27 && !pause) {
        pause = true;
    } else if (key == 27 && pause) {
        pause = false;
    }
}
