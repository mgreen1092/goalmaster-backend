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
router.get('/:id', async (req, res, next) => {
    try {
        const data = await DataPoints.findById(req.params.id)
        data ? res.json(data) : res.status(404)
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const newDataPoint = await DataPoints.create(req.body)
        newDataPoint ? res.status(201).json(newDataPoint) : res.status(422) // 422 (Unprocessable Entity) - missing a required field
    } catch (err) {
        next(err)
    }
})
module.exports = router