import { Server as NetServer } from "http";

import { Server } from "socket.io";

let io: Server;

export function initSocket(server: NetServer) {

  if (io) return io;

  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {

    console.log("Usuário conectado:", socket.id);

    socket.on("send-message", (message) => {

      io.emit("receive-message", message);

    });

    socket.on("disconnect", () => {

      console.log("Usuário desconectado:", socket.id);

    });

  });

  return io;

}
