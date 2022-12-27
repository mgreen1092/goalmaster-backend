const express = require('express')
const cors = require('cors')
const userController = require('./controllers/user')
const goalController = require('./controllers/goal')
const dataController = require('./controllers/dataTracker')
// const firebaseAuth = require('./authMiddleware')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(firebaseAuth.authenticate)

app.get('/', (req, res) => {
    res.redirect('/api/users')
})

app.use('/api/users/', userController)
app.use('/api/goals/', goalController)
app.use('/dataController', dataController)

app.set('port', process.env.PORT || 8080)

app.listen(app.get('port'), () => {
    console.log(`listening on port ${app.get('port')}`);
})
