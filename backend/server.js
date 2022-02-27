const express = require('express');
const dotenv = require('dotenv');
const app = express();
const colors = require('colors');
const { chats } = require('./data/data');
dotenv.config();
const connectDB = require('./config/db');
connectDB();

app.get('/', (req, res) => {
  res.send('API is running.');
});

app.get('/api/chat', (req, res) => {
  res.send(chats);
});

app.get('/api/chat/:id', (req, res) => {
  const singleChat = chats.find((chat) => chat._id === req.params.id);
  res.send(singleChat);
  console.log('singleChat: ', singleChat);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server started on ${PORT}`));