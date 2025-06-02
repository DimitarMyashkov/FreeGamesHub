let player = new Player(0, 0, 90, 75, 3, 10, enemyBlack2);
let enemies = [], numEnemies = 24, dirEnemies = 1;
let bullets = [], numBullets = 0;
let updates = 0;
let game = {pause: false, victory: false, loss: false, start: true};
const gameplayBGMusic = new Audio('./music/time_is_up.mp3');
const lossBGMusic = new Audio('./music/twinkling.mp3');
const victoryBGMusic = new Audio('./music/dreams_of_peace_2.ogg');

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
        enemies.push(new Enemy(165 + i * (90 + 75), 320, 80, 75, 1, 5, randomInteger(4) + 1, true));
    }
}

function update() {
    if (game.start) {
        if (!game.pause) {
            // gameplayBGMusic.play();
            gameplayBGMusic.loop;
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
            
            if (updates % (100 - numEnemies * 2) == 0) {
                bullets.push(new Bullet(enemies[randomInteger(numEnemies)].x + (enemies[randomInteger(numEnemies)].width / 2 - 5),
                                        enemies[randomInteger(numEnemies)].y + (enemies[randomInteger(numEnemies)].height), 10, 25, 2, -1));

                numBullets++;
            }

            for (let i = 0; i < numBullets; i++) {
                for (let j = 0; j < numEnemies; j++) {
                    if (bullets[i].collide(enemies[j].x, enemies[j].y, enemies[j].width, enemies[j].height) && bullets[i].type == 1) {
                        bullets[i].remove(bullets, i);
                        enemies[j].health--;
                        numBullets--;
                    }
                }
                if (bullets[i].collide(player.x, player.y, player.width, player.height) && bullets[i].type == -1) {
                    bullets[i].remove(bullets, i);
                    numBullets--;
                }
            }

            for (let i = 0; i < numBullets; i++) {
                if (bullets[i].y < -bullets[i].height || bullets[i].y > canvas.height) {
                    bullets[i].remove(bullets, i);
                    numBullets--;
                }
            }
        } else {
            gameplayBGMusic.pause();
        }
    }

    if (game.loss) {
        lossBGMusic.play();
        lossBGMusic.loop;
    } else {
        lossBGMusic.pause();
    }

    if (game.victory) {
        victoryBGMusic.play();
        victoryBGMusic.loop;
    } else {
        victoryBGMusic.pause();
    }
}

function draw() {
    if (game.start && !game.victory && !game.loss) {
        drawImage(backStars, 0, 0, canvas.width, canvas.height);
        player.draw();
        for (let i = 0; i < numEnemies; i++) {
            enemies[i].draw();
            enemies[i].drawHealth();
        }

        for (let i = 0; i < numBullets; i++) {
            bullets[i].draw();
        }

        if (game.pause) {
            context.fillStyle = '#000000';
            context.globalAlpha = 0.7;
            context.fillRect(0, 0, canvas.width, canvas.height);

            context.fillStyle = '#FFD100';
            context.globalAlpha = 1;
            context.font = '150px MS PGothic';
            context.fillText('PAUSE', canvas.width / 2 - 250, 50);
        }
    }
    
    if (game.victory) {
        context.fillStyle = '#000000';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = '#FFC300';
        context.font = '150px MS PGothic';
        context.fillText('YOU WIN!', canvas.width / 2 - 320, player.height);

        context.fillStyle = '#FF5733';
        context.font = '50px MS PGothic';
        context.fillText('Press "r" to restart.', canvas.width / 2 - 220, 350);

        context.font = '75px MS PGothic';
        context.fillText('Press "Esc" to continue', canvas.width / 2 - 400, 300);

    }
    
    if (game.loss) {
        context.fillStyle = '#000000';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = '#FF0000';
        context.font = '150px MS PGothic';
        context.fillText('GAME OVER', canvas.width / 2 - 425, player.height);

        context.fillStyle = '#FF5733';
        context.font = '50px MS PGothic';
        context.fillText('Press "r" to restart.', canvas.width / 2 - 220, 350);
    }
}

function keyup(key) {
    if (key == 32 && updates >= 40 && game.start && !game.pause) {
        bullets.push(new Bullet(player.x + (player.width / 2 - 5), player.y + (player.height / 2 - 50), 10, 25, 2, 1));
        numBullets++;
        updates = 0;
    }

    if (key == 27 && !game.pause) {
        game.pause = true;
    } else if (key == 27 && game.pause) {
        game.pause = false;
    }

    if (game.loss || game.victory && key == 87) {

    }
}
