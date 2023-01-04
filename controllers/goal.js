const express = require('express')
const Goal = require('../models/Goal')
const DataPoints = require('../models/dataTracker')
const router = express.Router()
const User = require('../models/User')

router.get('/', async (req, res, next) => {
    try {
        User.findOne({email: req.user.email}).populate('goals').exec( async (error, user) => {
            res.json(user)
        })
        // const goals = await Goal.find({})
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
    // console.log(req.user.email, 'REQ USER')
    console.log(req.body, 'REQ BODY')
    try {
        console.log(req.user, 'REQ USER')
        User.findOne({email: req.user.email}).populate('goals').exec( async (error, user) => {
            const newGoal = await Goal.create(req.body.addGoal)
            user.goals.push(newGoal)
            await user.save()
            console.log(user, '======================')
            res.status(201).json(user)
        })
        
        // User.findOne({email: req.user.email}, (err, user) => {
        //     console.log(user, '======================')
        //     res.status(201).json(user)
        // })
        // console.log(user)
        // const newGoal = await Goal.create(req.body)
        // res.status(201).json(newGoal) // add something here to catch missing name field otherwise 500 error
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