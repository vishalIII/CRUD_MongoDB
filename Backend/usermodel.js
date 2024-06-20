const mongoose = require('mongoose');

// Correct MongoDB connection string
mongoose.connect('mongodb://127.0.0.1:27017/mongopractice')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Define your schema and model below
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  username: String
});

const user = mongoose.model('User', userSchema);

module.exports = user;
