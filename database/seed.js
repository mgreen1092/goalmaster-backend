const User = require('../models/User')
const Goal = require('../models/Goal')
const DataTracker = require('../models/dataTracker')
const data = require('./seedData.json')

//Empty Users

const users = data.map(user => {
    return {
        email: user.email,
        goals: []
    }
})

const addUsers = async () => {
    await User.deleteMany({})
    const newUsers = await User.create(users)
    console.log('newusers:', newUsers)
    return newUsers
}

//Empty goals

const goals = []
data.forEach(user => {
    user.goals.forEach(goal => goals.push(goal))
})
const emptyGoals = goals.map(goalKey => {
    return {
        goal: goalKey.goal,
        description: goalKey.description,
        goalvalue: goalKey.goalvalue,
        occurence: goalKey.occurence,
        tracker: []
    }
})
const addGoals = async () => {
    await Goal.deleteMany({})
    const newGoals = Goal.create(emptyGoals)
    console.log("newgoals:", newGoals)
    return newGoals
}

//Create tracker

const dataTracker = []
data.forEach(user => {
    user.goals.forEach(goal => {
        goal.tracker.forEach(dataTrackerPoint => dataTracker.push(dataTrackerPoint))
    })
})

const addData = async () => {
    await DataTracker.deleteMany({})
    const newData = await DataTracker.create(dataTracker)
    console.log("newData:", newData)
    return newData
}

//Add datapoints to goals

const dataForGoal = []

data.forEach(user => {
    user.goals.forEach(goal => {
        goal.tracker.forEach(dataPoint => dataForGoal.push({...dataPoint, goalTitle: goals.goal}))
    })
})

const linkDataToGoals = async () => {
    for (let dataPoint of dataForGoal) {
        const found = await DataTracker.findOne({value: dataPoint.value})
        const updatedGoal = await Goal.findOneAndUpdate(
            { goal: dataPoint.goalTitle },
            { $push: { tracker: found._id} },
            { new: true }
        )
        console.log(updatedGoal)
    }
}

//Add goals to users

const goalsWithUser=[]

data.forEach(user => {
    user.goals.forEach(goal => {
        goalsWithUser.push({...goal, user: user.email})
    })
})

const linkGoalsToUsers = async () => {
    for (goalConnect of goalsWithUser) {
        const found = await Goal.findOne({ goal: goalConnect.goal })
        const updateUser = await User.findOneAndUpdate(
            { email: goalConnect.user },
            { $push: { goals: found._id }},
            { new: true }
        )
        console.log(updateUser)
    }
}

const main = async () => {
    await addUsers()
    await addGoals()
    await addData()
    await linkDataToGoals()
    await linkGoalsToUsers()
    process.exit()
}
main()