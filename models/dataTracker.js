const mongoose = require("../database/connection");
const Schema = mongoose.Schema;

const dataTrackerSchema = new Schema({
    value: {
        type: Number,
        required: true,
    },
}, { timestamps: true })

const DataTracker = mongoose.model('Tracker', dataTrackerSchema)
module.exports = DataTracker