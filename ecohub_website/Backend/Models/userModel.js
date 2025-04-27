const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')


const Schema = mongoose.Schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
  // spec: {
  //   type: String,
  //   required: true,
  // }

}, { timestamps: true})


userSchema.statics.login = async function(email, password) {
  console.log("login12313123")
  if (!email || !password) {
      throw Error('Email and password must be filled out')
  }

  const user = await this.findOne({ email })
  if (!user) {
      throw Error('Email doesn\'t exist in database')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
      throw Error('Incorrect password')
  }
  return user
}

userSchema.statics.signup = async function(email, password, username) {
  // data validation
  
  if (!email || !password || !username) {
      console.log('Fields must be filled out')
  }
  
  if (!validator.isEmail(email)) {
      console.log('Invalid email')
  }
  
  const alreadyExists = await this.findOne({ email })
  if (alreadyExists) {
      throw Error('Email already exists')
  }
  // hashing password
  const uniquify = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, uniquify)
  
  const userData = await this.create({ email, password: hash, username})
  // 'this' referes to the model not a specific instance of the schema
  return userData
}



module.exports = mongoose.model('Users', userSchema)