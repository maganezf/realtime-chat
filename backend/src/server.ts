import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import type { ClientMessage } from '../../types';
import { encrypt } from './utils/cryptography';

const app = express();
app.use(cors());

const httpServer = http.createServer(app);

const socket = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

socket.on('connection', socket => {
  console.log(`Connected, connection id: ${socket.id}`);

  socket.on('join_room', (data: { room: string; user: string }) => {
    socket.join(data.room);
    console.log('User connected', {
      connectionId: socket.id,
      userId: data.user,
      room: data.room,
    });
  });

  socket.on('send_message', (data: ClientMessage) => {
    socket.to(data.room).emit('receive_message', {
      ...data,
      message: encrypt(data.message),
    });
    console.log(
      `Server: This message was sent by the user ${data.author}: ${encrypt(
        data.message
      ).join('')}`
    );
  });

  socket.on('disconnect', () => {
    console.log('User disconnected', {
      connectionId: socket.id,
    });
  });
});

const port = 3333;

httpServer.listen(port, () =>
  console.log('Socket server is running! 🚀', { port })
);
