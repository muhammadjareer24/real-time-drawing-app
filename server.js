const express = require("express");

const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// Socket.IO setup
const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);

  // Listen for draw events from clients
  socket.on("draw", (data) => {
    // Broadcast the drawing data to all other clients
    socket.broadcast.emit("draw", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: ", socket.id);
  });
});
