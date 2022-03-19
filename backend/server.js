const express = require('express');
const dotenv = require('dotenv');
const app = express();
const colors = require('colors');
const userRoute = require('./serverRoutes/userRoute');
const chatRoute = require('./serverRoutes/chatRoute');
const messageRoute = require('./serverRoutes/messageRoute');
dotenv.config();
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const path = require('path');
connectDB();

app.use(express.json());

app.use('/api/user', userRoute);
app.use('/api/chat', chatRoute);
app.use('/api/message', messageRoute);

//----------------------Deployment-------------------------
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname1, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname1, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running..');
  });
}

//----------------------Deployment-------------------------
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(`server started on ${PORT}`.blue.bold)
);

//creates socket server
const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000'
  }
});

//establishes connection instance in server and return userdata from //frontend
io.on('connection', (socket) => {
  //console.log('connected to socket.io');
  socket.on('setup', (userData) => {
    socket.join(userData._id);
    socket.emit('connected');
  });

  socket.on('join chat', (room) => {
    socket.join(room);
    console.log('User Joined Room: ' + room);
  });

  socket.on('typing', (room) => socket.in(room).emit('typing'));
  socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

  socket.on('new message', (newMessageReceived) => {
    let chat = newMessageReceived.chat;
    if (!chat.users) return console.log('chat.users not defined');

    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return;

      socket.in(user._id).emit('message received', newMessageReceived);
    });
  });

  socket.off('setup', () => {
    console.log('USER DISCONNECTED');
    socket.leave(userData._id);
  });
});
