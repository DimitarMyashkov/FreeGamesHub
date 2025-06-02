class Player {
    constructor (x, y, width, height, speed, health, image) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.health = health;
        this.image = image;
    }

    move() {
        if (isKeyPressed[65]) {
            this.x -= this.speed;
        }else if (isKeyPressed[68]) {
            this.x += this.speed;
        }
    }

    draw() {
        drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

class Enemy {
    constructor (x, y, width, height, speed, health, type, isAlive) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.health = health;
        this.type = type;
        this.isAlive = isAlive;
    }

    draw() {
        if (this.type == 1) {
            drawImage(enemyBlack1, this.x, this.y, this.width, this.height);
        } else if (this.type == 2) {
            drawImage(enemyBlack3, this.x, this.y, this.width, this.height);
        } else if (this.type == 3) {
            drawImage(enemyBlack4, this.x, this.y, this.width, this.height);
        } else if (this.type == 4) {
            drawImage(enemyBlack5, this.x, this.y, this.width, this.height);
        }
    }

    drawHealth() {
        context.fillStyle = '#FF0000';
        context.fillRect(this.x, this.y - 40, this.width, 10)
        context.fillStyle = '#00FF00';
        context.fillRect(this.x, this.y - 40, Math.floor(this.width / 5) * this.health, 10);
    }
}

class Bullet {
    constructor (x, y, width, height, speed, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.type = type;
    }

    move() {
        this.y -= this.speed * this.type;
    }

    draw() {
        if (this.type == 1) {
            context.fillStyle = '#0000FF';
        }
        if (this.type == -1) {
            context.fillStyle = '#FF0000';
        }

        context.globalAlpha = 0.4;
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    clear(num) {
        --num
        this.x = NaN;
        this.y = NaN;
        this.width = NaN;
        this.height = NaN;
        this.speed = NaN;
        this.type = NaN;
    }

    collide(x, y, w, h) {
        return areColliding(this.x, this.y, this.width, this.height, x, y, w, h);
    }
}
