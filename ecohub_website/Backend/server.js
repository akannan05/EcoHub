require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose')
// const modelRoutes = require('./routes/models')
const userRoutes = require('./Routes/users')
const uploadRoutes = require('./Routes/upload');



const app = express();
app.use(express.json()) // allows server to be able to parse JSON


// routing
// app.use('/api/models', modelRoutes)
app.use('/api/users', userRoutes)
app.use('/api/upload', uploadRoutes);


console.log(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI) //connecets to the mongo atlas db server
  .then(() => { //success
    app.listen(4000, () => { // use local host 4000
      console.log('Connected to db and listening on port 4000');
    })
  })
  .catch((error) => { //failure
    console.log(error)
  })