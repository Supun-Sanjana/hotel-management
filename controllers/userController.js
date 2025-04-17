import User from "../Models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export function getUsers(req, res) {


    // res.send("get users");
    User.find().then((usersList)=>{
        res.json({
          list : usersList
        });
    }).catch((err)=>{
        console.log(err);
        res.send("error getting users");
    })
  };


export function postUsers(req, res) {
  const user = req.body;
  //user -> req user data


  const password = req.body.password;

  const saltRound = 10;
  const hashedPassword = bcrypt.hashSync(password, saltRound);
  user.password = hashedPassword;
  
  const newUser = new User(user);
  // User -> model name
  // newUser -> instance of the model
  //user -> req body data

  newUser.save().then(()=>{

    console.log("user saved to database");
    res.send("user created successfully");
  }).catch((err)=>{

    console.log(err);
    console.log("error saving user to database");
    res.send("user creation faild");
  })
  
  
  

    
  };

export function deleteUsers(req, res) {

    const deleteEmail = req.body.email;
    //email -> req body data
    
    User.deleteOne({email : deleteEmail}).then(()=>{
      console.log("user deleted from database");
      res.json({
        message : "delete user successfully"
      });
    }).catch((err)=>{
      res.json({
        message : "failed delete user"
      })
    })

    
  };

  export function putUsers(req, res) {
   
  };

  

  export function loginUser(req, res) {
    const credentials = req.body;
  
    User.findOne({ email: credentials.email }).then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "User Not Found"
        });
      }
  
      const isPasswordValid = bcrypt.compareSync(credentials.password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Invalid Password"
        });
      }
  
      const payload = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        type: user.type
      };
  
      const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1h" });
  
      res.json({
        message: "User Found",
        user: user,
        token: token
      });
    }).catch((err) => {
      console.error("Login error:", err);
      res.status(500).json({ message: "Internal Server Error" });
    });
  }
  