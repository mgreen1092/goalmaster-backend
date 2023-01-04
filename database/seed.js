const User = require('../models/User')
const Goal = require('../models/Goal')
const DataTracker = require('../models/dataTracker')
const data = require('./seedData.json')

//Empty Users

const users = data.map(user => {
    return {
        uid: user.uid,
        email: user.email,
        goals: []
    }
})

const addUsers = async () => {
    await User.deleteMany({})
    const newUsers = await User.create(users)
    // console.log('newusers:', newUsers)
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
    // console.log("newgoals:", newGoals)
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
    // console.log("newData:", newData)
    return newData
}

//Add data points to goals

const dataForGoal = []

data.forEach(user => {
    user.goals.forEach(goal => {
        goal.tracker.forEach(dataPoint => dataForGoal.push({...dataPoint, goalTitle: goal.goal}))
    })
})
// console.log('========================== DATA FOR GOAL')
// console.log(dataForGoal)
// console.log('==========================')

const linkDataToGoals = async () => {
    for (let dataPoint of dataForGoal) {
        console.log(dataPoint, '****data point*****')
        console.log(dataPoint.value, '-------DATAPOINT VALUE--------')
        // console.log(dataForGoal, '********DATA FOR GOAL*******')
        const foundData = await DataTracker.findOne({value: dataPoint.value})
        console.log('==========================')
        console.log(foundData, '****FOUND****')
        // console.log(found._id, '****FOUND ID****')
        // console.log('==========================')
        // console.log(dataPoint.goalTitle)
        // console.log('==========================')
        // console.log(found._id)
        const updatedGoal = await Goal.findOneAndUpdate(
            { goal: dataPoint.goalTitle },
            { $push: { tracker: foundData._id } },
            { new: true }
        )
        console.log(updatedGoal, 'UPDATED GOAL')
        // const findTracker = Goal.findOne({_id: '63adfe4d1ceafccd4e891053'})
        // console.log(findTracker)
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
        // console.log(goalConnect, '****GOAL CONNECT****')
        // console.log(goalsWithUser, '===GOALS WITH USERS===')
        const found = await Goal.findOne({ goal: goalConnect.goal })
        // console.log(found, '****GOAL FOUND****')
        const updateUser = await User.findOneAndUpdate(
            { email: goalConnect.user },
            { $push: { goals: found._id }},
            { new: true }
        )
        // console.log(updateUser, '^^^^^^^^UPDATE USER^^^^^^^^')
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