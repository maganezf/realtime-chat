import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import type { Message } from '../../types';
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
  console.log(`User Connected: ${socket.id}`);

  socket.on('join_room', (room: string) => {
    socket.join(room);
    console.log(`User with ID: ${socket.id} joined in the room: ${room}`);
  });

  socket.on('send_message', (data: Message) => {
    socket.to(data.room).emit('receive_message', data);
    console.log({
      encryptedMessage: `${encrypt(data.message).join('')}`,
      fromUser: data.author,
    });
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

const port = 3333;

httpServer.listen(port, () =>
  console.log('Socket server is running! 🚀', { port })
);
