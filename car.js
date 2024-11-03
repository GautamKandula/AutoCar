class Car {
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        
        this.velocity = 0;
        this.accel = 0.2;
        this.terminalVelocity = 3;
        this.friction = 0.05;
        this.angle = 0;

        this.controls = new Controls(); // See controls.js for methods
    }

    update(){
        this.#move();
    }

    // All Movement Logic
    #move() {
        if (this.controls.forward){
            this.velocity += this.accel;

        }
        if (this.controls.reverse){
            this.velocity -= this.accel;
        }

        if (this.velocity > this.terminalVelocity) {
            this.velocity = this.terminalVelocity;
        }

        if (this.velocity < -this.terminalVelocity/2){
            this.velocity = -this.terminalVelocity/2;
        }

        if (this.velocity > 0) {
            this.velocity -= this.friction;
        }
        
        if (this.velocity < 0) {
            this.velocity += this.friction;
        }

        if (Math.abs(this.velocity) < this.friction) {
            this.velocity = 0;
        }

        if (this.velocity != 0) {
            const flip = this.velocity>0 ? 1: -1;
            if (this.controls.left){
                this.angle += 0.03*flip;
            }
    
            if (this.controls.right) {
                this.angle -= 0.03*flip;
            }
        }
        
        // Assume unit circle flipped 90 degrees counter-clockwise
        this.x -= Math.sin(this.angle)*this.velocity;
        this.y -= Math.cos(this.angle)*this.velocity;
    }
    
    // Creates "Car" Block
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);

        ctx.beginPath();
        ctx.rect(
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        );
        ctx.fill();
        
        // Sets angle and position correctly
        ctx.restore();
    }
}
