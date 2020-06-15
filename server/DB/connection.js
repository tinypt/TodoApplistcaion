const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

const URI =
  'mongodb+srv://adminDb:1234567890bitkub@cluster0-zfp7c.mongodb.net/test?retryWrites=true&w=majority';

const connectDB = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log('DB connected!!');
};

module.exports = connectDB;
