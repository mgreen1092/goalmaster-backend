const mongoose = require("../database/connection");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    goals: [{
        type: Schema.Types.ObjectId,
        ref: 'Goal'
    }]
})

const User = mongoose.model('User', userSchema)
module.exports = User