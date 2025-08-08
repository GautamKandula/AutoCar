const canvas = document.getElementById("project");

canvas.height = window.innerHeight;
canvas.width = 200; // TBD on size

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width/2, canvas.width*0.9);
const car = new Car(road.getLaneCenter(2), 100, 30, 50);
car.draw(ctx);

animate(); // called on loop to simulate real time copy

function animate() {
    car.update();

    canvas.height = window.innerHeight; // Clears Canvas after animation frame (no leftover images)
    
    road.draw(ctx)
    car.draw(ctx);
    requestAnimationFrame(animate); // Sets animate to animation frame
}

