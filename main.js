const canvas = document.getElementById("project");

canvas.height = window.innerHeight;
canvas.width = 200; // TBD on size

const ctx = canvas.getContext("2d");
const car = new Car(100, 100, 30, 50);
car.draw(ctx);

animate(); // called on loop to simulate real time copy

function animate() {
    car.update();
    canvas.height = window.innerHeight; // Clears Canvas after animation frame (no leftover images)
    car.draw(ctx);
    requestAnimationFrame(animate); // Sets animate to animation frame
}

