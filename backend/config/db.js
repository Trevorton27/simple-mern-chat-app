const mongoose = require('mongoose');
const colors = require('colors');

async function connectDb() {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Mongodb connected yo!'.cyan.underline);
  } catch (error) {
    console.log(error.red.bold);
    process.exit(1);
  }
}

module.exports = connectDb;
