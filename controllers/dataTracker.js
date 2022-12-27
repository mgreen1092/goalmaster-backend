const express = require('express')
const router = express.Router()
const DataPoints = require('../models/dataTracker')

router.get('/', async (req, res, next) => {
    try {
        const dataPoints = await DataPoints.find({})
        res.json(dataPoints)
    } catch (err) {
        next(err)
    }
})
module.exports = router