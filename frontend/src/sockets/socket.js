// src/sockets/socket.js

import { io } from 'socket.io-client';

const socket = io('https://worknest-0i8a.onrender.com', {
  auth: {
    token: localStorage.getItem('token'),
  },
  transports: ['websocket'],
});

export default socket;
