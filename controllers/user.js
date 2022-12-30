const express = require('express')
const User = require('../models/User')
const Goal = require('../models/Goal')
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const users = await User.find({}).populate('goals')
        res.json(users)
    }
    catch (err) {
        next(err)
    }
})

router.get('/:email', async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.params.email }).populate('goals')
        user ? res.json(user) : res.sendStatus(404)
    }
    catch (err) {
        next(err)
    }
})

router.put('/:email/add', async (req, res, next) => {
    try {
        // console.log(req.params.email)
        let goalToAdd
        const user = await User.findOne({ email: req.params.email })
        req.body._id
            ? goalToAdd = await Goal.findById(req.body._id)
            : res.sendStatus(404)
        const newGoals = [...user.goals, goalToAdd]
        const updatedUser = await User.findOneAndUpdate(
            { email: req.params.email },
            { goals: newGoals },
            { new: true }
        )
        updatedUser ? res.status(201).json(updatedUser) : res.sendStatus(404)
    } catch (err) {
        next(err)
    }
})

router.put('/:email/remove', async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.params.email })
        const newGoals = [...user.goals].filter(goal => goal._id != req.body._id)
        const updatedUser = await User.findOneAndUpdate(
            { email: req.params.email },
            { goals: newGoals },
            { new: true }
        )
        updatedUser ? res.status(201).json(updatedUser) : res.sendStatus(404)
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const newUserInfo = req.body
        const newUser = await User.create(newUserInfo)
        res.json(newUser)
    }
    catch (err) {
        next(err)
    }
})

module.exports = router