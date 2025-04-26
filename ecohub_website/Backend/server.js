require('dotenv').config();

const mongoose = require('mongoose')

const express = require('express');
const mongoose = require('mongoose')
const modelRoutes = require('./routes/groups')
const userRoutes = require('./routes/users')



const app = express();
app.use(express.json()) // allows server to be able to parse JSON


// routing
app.use('/api/groups', modelRoutes)
app.use('/api/user', userRoutes)




mongoose.connect(process.env.MONGO_URI) //connecets to the mongo atlas db server
  .then(() => { //success
    app.listen(4000, () => { // use local host 4000
      console.log('Connected to db and listening on port 4000');
    })
  })
  .catch((error) => { //failure
    console.log(error)
  })