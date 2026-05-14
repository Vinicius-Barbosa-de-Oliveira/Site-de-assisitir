import { Server } from "socket.io";

declare global {
  var io: Server | undefined;
}

export const io =
  global.io ||
  new Server(3001, {
    cors: {
      origin: "*",
    },
  });

if (!global.io) {
  global.io = io;
}