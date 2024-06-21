const mongoose = require('mongoose');

// Correct MongoDB connection string
mongoose.connect('mongodb://127.0.0.1:27017/project1')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

const userSchema = mongoose.Schema({
    image : String,
    email : String,
    name : String,
})

module.exports = mongoose.model('user',userSchema)