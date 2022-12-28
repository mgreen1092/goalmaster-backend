const mongoose = require("../database/connection");
const Schema = mongoose.Schema;

const goalSchema = new Schema({
    goal: {
        type: String,
        required: true
    },
    description: String,
    goalvalue: {
        type: Number,
        required: true
    },
    occurence: {
        type: String,
        required: true
    },
    tracker: [{
        type: Schema.Types.ObjectId,
        ref: 'Tracker'
    }]
})

const Goal = mongoose.model('Goal', goalSchema)
module.exports = Goal