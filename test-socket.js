
const io = require('socket.io-client');

const socket = io('https://api.hirecta.com', {
    transports: ['websocket'],
    withCredentials: true
});

socket.on('connect', () => {
    console.log('Successfully connected to socket!');
    socket.emit('start-interview', { name: 'TestUser', role: 'Tester' });
});

socket.on('connect_error', (err) => {
    console.error('Connection error:', err.message);
});

socket.on('message', (data) => {
    console.log('Received message:', data);
    socket.disconnect();
});

setTimeout(() => {
    console.log('Timeout reached, closing.');
    socket.close();
}, 5000);
