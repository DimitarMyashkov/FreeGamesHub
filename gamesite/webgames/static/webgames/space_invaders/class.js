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
        if (isKeyPressed[87]) {
            this.y -= this.speed;
        }
        if (isKeyPressed[83]) {
            this.y += this.speed;
        }
        if (isKeyPressed[65]) {
            this.x -= this.speed;
        }
        if (isKeyPressed[68]) {
            this.x += this.speed;
        }
    }

    draw() {
        drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}