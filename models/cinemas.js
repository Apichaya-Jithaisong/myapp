var mongoose = require('mongoose');

var cinemasSchema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String,
    num: String,
});

module.exports = mongoose.model('cinemas', cinemasSchema);