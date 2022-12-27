const mongoose = require("../database/connection");
const Schema = mongoose.Schema;

const goalSchema = new Schema({
    goal: {
        type: String,
        required: true
    },
    description: String,
    // {
    //     type: String,
    //     required: true
    //     // required: false
    // },
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

// function isMyFieldRequired () {
//     return typeof this.myField === 'string'? false : true
// }

const Goal = mongoose.model('Goal', goalSchema)
module.exports = Goal