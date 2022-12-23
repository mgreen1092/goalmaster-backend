const mongoose = require("../database/connection");
const Schema = mongoose.Schema;

const trackerSchema = new Schema({
    value: {
        type: Number,
        required: true,
    }
}, { timestamps: true })

const Tracker = mongoose.model('Tracker', trackerSchema)
module.exports = Tracker