const mongoose = require('mongoose');

  function dbConnection(){
    mongoose.connect('mongodb+srv://rasedev32:Am7693Ru@cluster0.g6njr.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected!'));

  }

  module.exports = dbConnection;