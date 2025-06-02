let player = { x: 0, y: 0, width: 55, height: 110, dir: 0, health: 275, mana: 0 };
let frames = { player: 0, enemies: 0 };
let camera = { x: 0, y: 0, speed: 4 }, game = { victory: false, loss: false, pause: false, start: true };
let magic = { x: undefined, y: undefined, width: 125, height: 125, frame: 0, chosen: false, activated: false };
let crystal = { x: undefined, y: undefined, width: 75, height: 175, frame: 0, draw: false, end: false, reverse: false };
let updates = 0;
let runes = [], enemies = [], distanceX = [], distanceY = [], angle = [];
const gameplayBGMusic = new Audio('./music/FullScores/Orchestral Scores/bosstheme_WO_low.mp3');
const winBGMusic = new Audio('./music/FullScores/Orchestral Scores/Ove Melaa - Heaven Sings.mp3');
const lossBGMusic = new Audio('./music/FullScores/Orchestral SCores/Ove Melaa - Times.mp3');

function init() {
    for (let i = 0; i < 70; i++) {
        runes.push(new Runes(Math.round(Math.random() * (10000 + canvas.width) - 5000),
            Math.round(Math.random() * (10000 + canvas.height) - 5000), 50));
    }

    for (let i = 0; i < 10; i++) {
        enemies.push(new Enemies(Math.round(Math.random() * 10000 - 5000 - canvas.width / 2),
            Math.round(Math.random() * 10000 - 5000 - canvas.height / 2), 75, 100));
    }
    
}

function update() {
    if (game.start && !game.loss && !game.victory) {
        updates++;
        if (!game.pause) {
            gameplayBGMusic.play();
            player.dir = 0;

            for (let i = 0; i < 10; i++) {
                enemies[i].pathfind(camera.x, camera.y, 3);
            }

            if (updates % 10 == 0) {
                frames.player++;
            }
            if (frames.player == 3) {
                frames.player = 0;
            }

            if (updates % 10 == 0) {
                frames.enemies++;
            }
            if (frames.enemies >= 7) {
                frames.enemies = 0;
            }

            if (magic.activated) {
                if (updates % 10 == 0) {
                    magic.frame++;
                }
            }

            if (updates % 10 == 0 && crystal.draw) {
                crystal.frame++;
            }
            if (crystal.frame >= 6) {
                crystal.reverse = true;
            }
            if (crystal.reverse) {
                crystal.frame--;
            }
            if (crystal.frame < 0 && crystal.draw) {
                crystal.frame = 0;
                crystal.end = true;
            }

            if (isKeyPressed[87]) {
                player.dir = 1;
                camera.y -= camera.speed;
            } else if (isKeyPressed[83]) {
                player.dir = 2;
                camera.y += camera.speed;
            } else if (isKeyPressed[65]) {
                player.dir = 3;
                camera.x -= camera.speed;
            } else if (isKeyPressed[68]) {
                player.dir = 4;
                camera.x += camera.speed;
            }

            if (camera.y <= -5000 + canvas.height / 2 && player.dir == 1) {
                player.dir = 0;
                camera.y = -5000 + canvas.height / 2;
            }
            if (camera.y >= 5000 - canvas.height / 2 && player.dir == 2) {
                player.dir = 0;
                camera.y = 5000 - canvas.height / 2;
            }
            if (camera.x <= -5000 + canvas.width / 2 && player.dir == 3) {
                player.dir = 0;
                camera.x = -5000 + canvas.width / 2;
            }
            if (camera.x >= 5000 - canvas.width / 2 && player.dir == 4) {
                player.dir = 0;
                camera.x = 5000 - canvas.width / 2;
            }

            for (let i = 0; i < 70; i++) {
                runes[i].collide(camera.x, camera.y,  player.width, player.height, player.mana);
            }

            for (let i = 0; i < 70; i++) {
                if (runes[i].x < -5000 + canvas.width / 2 || runes[i].x > 5000 - canvas.width / 2 || runes[i].y < -5000 + canvas.height / 2 ||
                    runes[i].y > 5000 - canvas.height / 2) {
                    runes[i].x = NaN;
                }
            }

            if (player.health < 0) {
                player.health = 0;
            }

            if (player.mana >= 11) {
                player.mana = 11;
            }

            for (let i = 0; i < 10; i++) {
                enemies[i].collidePlayer(camera.x, camera.y, player.width, player.height);
            }

            if (magic.frame >= 7) {
                crystal.draw = true;
                crystal.x = magic.x + 25;
                crystal.y = magic.y;
            }

            if (crystal.end) {
                game.victory = true;
            }

            if(player.health == 0){
                game.loss = true;
            }
        }
    } else {
        gameplayBGMusic.pause();
        player.mana = 0;
        game.start = false;
    }

    if(game.victory){
        winBGMusic.play();
    }else{
        winBGMusic.pause();
    }

    if(game.loss){
        lossBGMusic.play();
    }else{
        lossBGMusic.pause();
    }
}

function draw() {
    if (!game.loss && !game.victory && game.start) {
        drawImage(backDarkForest, -5000 + canvas.width / 2 - camera.x, -5000 + canvas.height / 2 - camera.y, 10000, 10000);
        for (let i = 0; i < 70; i++) {
            drawImage(rune, runes[i].x + canvas.width / 2 - camera.x, runes[i].y + canvas.height / 2 - camera.y, runes[i].size, runes[i].size);
        }
        for (let i = 0; i < 10; i++) {
            if (enemies[i].x >= camera.x) {
                drawImage(skeletonRight[frames.enemies], enemies[i].x + canvas.width / 2 - camera.x,
                    enemies[i].y + canvas.height / 2 - camera.y, enemies[i].width, enemies[i].height);
            } else if (enemies[i].x <= camera.x) {
                drawImage(skeletonLeft[frames.enemies], enemies[i].x + canvas.width / 2 - camera.x,
                    enemies[i].y + canvas.height / 2 - camera.y, enemies[i].width, enemies[i].height);
            }
        }

        if (magic.activated) {
            if (magic.frame < 7) {
                drawImage(druidAttack3[magic.frame], magic.x, magic.y, magic.width, magic.height);
            }
        }

        if (crystal.draw) {
            if (crystal.frame < 7 && crystal.frame > -1) {
                drawImage(ancientCrystal[crystal.frame], crystal.x, crystal.y, crystal.width, crystal.height);
            }
        }

        if (player.dir == 0) {
            drawImage(monkeyIdle[frames.player], player.x + canvas.width / 2, player.y + canvas.height / 2, player.width, player.height);
        }
        if (player.dir == 1) {
            drawImage(monkeyUp[frames.player], player.x + canvas.width / 2, player.y + canvas.height / 2, player.width, player.height);
        }
        if (player.dir == 2) {
            drawImage(monkeyDown[frames.player], player.x + canvas.width / 2, player.y + canvas.height / 2, player.width, player.height);
        }
        if (player.dir == 3) {
            drawImage(monkeyLeft[frames.player], player.x + canvas.width / 2, player.y + canvas.height / 2, player.width, player.height);
        }
        if (player.dir == 4) {
            drawImage(monkeyRight[frames.player], player.x + canvas.width / 2, player.y + canvas.height / 2, player.width, player.height);
        }

        context.fillStyle = '#007700';
        context.fillRect(10, 70, 275, 50);
        context.fillStyle = '#00FF00';
        context.fillRect(10, 70, player.health, 50);
        context.strokeStyle = '#004400';
        context.lineWidth = 3;
        context.strokeRect(10, 70, 275, 50);
        context.fillStyle = '#004400';
        context.font = '42.5px MS PGothic';
        context.fillText('Health', 90, 72.5);

        context.fillStyle = '#007777';
        context.fillRect(10, 15, 275, 50);
        context.fillStyle = '#00FFFF';
        context.fillRect(10, 15, player.mana * 25, 50);
        context.strokeStyle = '#004444';
        context.lineWidth = 3;
        context.strokeRect(10, 15, 275, 50);
        context.fillStyle = '#004444';
        context.font = '42.5px MS PGothic';
        context.fillText('Mana', 97.5, 18);

        if (game.pause) {
            context.fillStyle = '#000000';
            context.globalAlpha = 0.7;
            context.fillRect(0, 0, canvas.width, canvas.height);

            context.fillStyle = '#FFD100';
            context.globalAlpha = 1;
            context.font = '150px MS PGothic';
            context.fillText('PAUSE', canvas.width / 2 - 250, 50);

            context.font = '75px MS PGothic';
            context.fillText('Press "Esc" to continue', canvas.width / 2 - 400, 300);
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

function keydown(key) {
    if (key == 27 && !game.pause) {
        game.pause = true;
    } else if (key == 27 && game.pause) {
        game.pause = false;
    }

    if (key == 82 && game.loss || game.victory) {
        game.victory = false;
        game.loss = false;
        game.pause = false;
        game.start = true;
        player.x = 0;
        camera.x = 0;
        player.y = 0;
        camera.y = 0;
        player.health = 275;
        player.mana = 0;
        for (let i = 0; i < 10; i++) {
            enemies[i].x = Math.round(Math.random() * (10000 + canvas.width) - 5000);
            enemies[i].y = Math.round(Math.random() * (10000 + canvas.width) - 5000);
        }
        magic.activated = false;
        crystal.frame = 0;
        crystal.reverse = false;
        crystal.end = false;
        crystal.draw = false;
        magic.frame = false;
    }
    
    if (!game.pause && !game.victory && !game.loss) {
        if (key == 49) {
            magic.chosen = true;
        }
    }
}

function mouseup() {
    if (!game.pause) {
        if (magic.chosen && player.mana == 11) {
            magic.x = mouseX - magic.width / 2;
            magic.y = mouseY - magic.height / 2;
            magic.frame = 0;
            magic.activated = true;
        }
    }
}
