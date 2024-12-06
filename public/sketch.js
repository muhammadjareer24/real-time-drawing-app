let socket;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0, 0, 0);

  // Connect to the server
  socket = io.connect("http://localhost:3000/");

  // Listen for drawing data from the server
  socket.on("draw", (data) => {
    // Draw the circle received from the server
    fill(255, 0, 0); // Same color as the local drawing
    noStroke();
    circle(data.x, data.y, 50); // Use the data received from the server
  });
}

function draw() {}

function mouseDragged() {
  fill(255, 0, 0);
  noStroke();
  circle(mouseX, mouseY, 50);

  const circleData = {
    x: mouseX,
    y: mouseY,
  };

  // Send drawing data to the server
  socket.emit("draw", circleData);
}
