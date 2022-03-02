const express = require('express');
const dotenv = require('dotenv');
const app = express();
const colors = require('colors');
const { chats } = require('./data/data');
dotenv.config();
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorHandler');
connectDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running.');
});

app.use('/api/user', require('./serverRoutes/userRoute'));
app.use('/api/chat', require('./serverRoutes/chatRoute'));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server started on ${PORT}`.blue.bold));
