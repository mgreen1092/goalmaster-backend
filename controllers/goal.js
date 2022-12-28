const express = require('express')
const Goal = require('../models/Goal')
const DataPoints = require('../models/dataTracker')
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const goals = await Goal.find({}).populate('tracker')
        res.json(goals)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const goal = await Goal.findById(req.params.id).populate('tracker')
        goal ? res.json(goal) : res.sendStatus(404)
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const newGoal = await Goal.create(req.body)
        res.status(201).json(newGoal) // add something here to catch missing name field otherwise 500 error
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const deletedGoal = await Goal.findByIdAndDelete(req.params.id)
        deletedGoal ? res.sendStatus(204) : res.sendStatus(404)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const updatedGoal = await Goal.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        updatedGoal ? res.status(200).json(updatedGoal) : res.sendStatus(404)
    } catch (err) {
        next(err)
    }
})

router.put('/:id/add', async (req, res, next) => {
    try {
        let trackerToAdd
        const goal = await Goal.findById(req.params.id)
        req.body._id
            ? trackerToAdd = await DataPoints.findById(req.body._id)
            : res.sendStatus(500)
        const newDataPoints = [...goal.tracker, trackerToAdd]
        const updatedGoal = await Goal.findByIdAndUpdate(
            req.params.id,
            { tracker: newDataPoints },
            { new: true }
        )
        updatedGoal ? res.status(201).json(updatedGoal) : res.sendStatus(404)
    } catch (err) {
        next(err)
    }
})

router.put('/:id/remove', async (req, res, next) => {
    try {
        const goal = await Goal.findById(req.params.id)
        const newDataPoints = [...goal.tracker].filter(data => {
            return data._id != req.body._id
        })
        const updatedGoal = await Goal.findByIdAndUpdate(
            req.params.id,
            { tracker: newDataPoints },
            { new: true }
        )
        updatedGoal ? res.status(201).json(updatedGoal) : res.sendStatus(404)
    } catch (err) {
        next(err)
    }
})

module.exports = router