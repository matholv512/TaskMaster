const mongoose = require('mongoose');

const HomeSchrema = new mongoose.Schema({
    titulo: {type: String, required: true},
    descrição: String
});

const HomeModel = mongoose.model('Home', HomeSchrema);

class Home {

}

module.exports = Home;