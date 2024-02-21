import { Server } from "socket.io";

const io = new Server(8000, { cors: true });

const socketIdToEmail = new Map();
const emailToSocketId = new Map();

io.on("connection", (socket) => {
  console.log("Socket connected", socket.id);
  socket.on("room:join", (data) => {
    console.log(`${socket.id} -> ${data.email} and ${data.roomId}`);
    socketIdToEmail.set(socket.id, data.email);
    emailToSocketId.set(data.email, socket.id);
    io.to(data.roomId).emit("user:joined", {
      email: data.email,
      id: socket.id,
    });
    socket.join(data.roomId);
    io.to(socket.id).emit("room:join", data);
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incoming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
});
