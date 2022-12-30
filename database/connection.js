const mongoose = require('mongoose')
require('dotenv').config()

mongoose.Promise = Promise

let mongoURI = process.env.DATABASE_URL

if (process.env.NODE_ENV === "production") {
  mongoURI = process.env.DATABASE_URL;
} else {
  mongoURI = "mongodb://localhost/goalmaster";
}

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((instance) =>
    console.log(`Connected to db: ${instance.connections[0].name}`)
  )
  .catch((error) => console.log('Connection failed!', error))

module.exports = mongoose;