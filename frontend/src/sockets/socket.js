// src/sockets/socket.js

import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', {
  auth: {
    token: localStorage.getItem('token'),
  },
  transports: ['websocket'],
});

export default socket;
