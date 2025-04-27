require('dotenv').config();

const User = require('../Models/userModel')
const model = require('../Models/modelModel')


async function loginUser(req,res) {
  console.log("We are calling loginUser here")
  const { email, password} = req.body
  
  if (!email || !password) { // redundent check
      console.log("Please enter both a username and password")
      return res.status(400).json({error: "Email or Password not found"})
  }
  try{
    console.log("yes and no")
      const user = await User.login(email, password)
      //const token = createToken(user._id)
      return res.status(200).json({email,userId: user._id})
  } catch(error) {
      return res.status(400).json({error: error.message})
  }
}

async function signupUser(req,res){

  const {email, password, username} = req.body;
  // now we want to make sure we receive all the data
  if (!email || !password || !username){ 
      console.log("Didn't recieve all correct data");
      //now we want to send a response saying that we didn't get all information
      //send 400 code because we had invalid syntax
      return res.status(400).json({error: "The information you entered is not in the correct format!"});
  }
  // now we want to make sure we don't have any repeat email
  try {
      const existingUser = await User.findOne({email}); // using the braces creates a parameter
      // findOne needs an Object to search the database. 
      if (existingUser) {
          //console.log("user already exists");
          res.status(400).json({error: "This email already exists"});
      }
      // now I want to create the user
      const user = await User.signup(email,password, username);
      //console.log(user._id);
      //const token = createToken(user._id);
      return res.status(200).json(user)
  } catch (error) {
      return res.status(400).json({error: error.message})
  }
}


module.exports = {
  loginUser,
  signupUser
}