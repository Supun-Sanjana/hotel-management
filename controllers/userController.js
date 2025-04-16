import User from "../Models/user.js";
import jwt from "jsonwebtoken";

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

    User.findOne({email : credentials.email , password : credentials.password}).then((user)=>{
        if(user == null){
            res.status(404).json({
               message : "User Not Found"
           })
            
        }else{

          const payload = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            type: user.type
          };
          
          const token = jwt.sign(payload, "secretKey", { expiresIn: "1h" });
          
          res.json({
            message: "User Found",
            user: user,
            token: token
          });
          
        }
    })

  }