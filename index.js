const express = require('express')
const cors = require('cors')
const userController = require('./controllers/user')
const goalController = require('./controllers/goal')
const dataController = require('./controllers/dataTracker')
const app = express()
const Middleware = require('./authentication.js')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(Middleware.authenticate)

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', (req, res) => {
    res.redirect('/api/users')
})

app.use('/api/users/', userController)
app.use('/api/goals/', goalController)
app.use('/api/data', dataController)

app.set('port', process.env.PORT || 8080)

app.listen(app.get('port'), () => {
    console.log(`listening on port ${app.get('port')}`);
})
