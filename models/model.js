const mongoose = require('mongoose')
const Schema = mongoose.Schema


const User = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: String,
    favourites: [],
    meals: Array,
    personal: Object,
    dayData: Object

})

const UserModel  = mongoose.model('calorieHUB',User)

module.exports = UserModel


