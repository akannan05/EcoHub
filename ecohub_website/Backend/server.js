require('dotenv').config();

const mongoose = require('mongoose')


mongoose.connect(process.env.MONGO_URI) //connecets to the mongo atlas db server
  .then(() => { //success
    app.listen(4000, () => { // use local host 4000
      console.log('Connected to db and listening on port 4000');
    })
  })
  .catch((error) => { //failure
    console.log(error)
  })