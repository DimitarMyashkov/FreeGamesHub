class Player {
    constructor (x, y, width, height, speed, image) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
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
    constructor (x, y, width, height, speed, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.type = type;
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
        if (this.type == 1) {   // player bullet
            this.y -= this.speed;
        } else if (this.type == 2) {    // enemy bullet
            this.y += this.speed;
        }
    }

}
