const carCanvas = document.getElementById("carProject");
const networkCanvas = document.getElementById("networkProject");

carCanvas.width = 200; // TBD on size
networkCanvas.width = 300;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width/2, carCanvas.width*0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50, "AI");
const traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50, "TRAFFIC", 2)
];

animate(); // called on loop to simulate real time copy

function animate(time) {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
    }
    car.update(road.borders, traffic);

    carCanvas.height = window.innerHeight; // Clears Canvas after animation frame (no leftover images)
    networkCanvas.height = window.innerHeight;

    carCtx.save();
    carCtx.translate(0, -car.y+carCanvas.height*0.7);

    road.draw(carCtx);
    for (let i = 0; i< traffic.length; i++) {
        traffic[i].draw(carCtx);
    }
    car.draw(carCtx);

    carCtx.restore();

    networkCtx.lineDashOffset = -time/70;

    Visualizer.drawNetwork(networkCtx, car.brain);
    requestAnimationFrame(animate); // Sets animate to animation frame
}

