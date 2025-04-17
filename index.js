import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './Routes/usersRouts.js';
import gallerItemRouter from './Routes/galleryItemRouter.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';


const app = express();

app.use(bodyParser.json());

const conString = "mongodb+srv://supun:1234@cluster0.nhzn6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


app.use((req,res,next)=>{

    const token =req.header("Authorization")?.replace("Bearer ", "")
    if(token != null){
        jwt.verify(token, "secretKey", (err, decoded)=>{
            if(decoded != null){
                req.user = decoded;
                console.log(decoded);
                next();
                
            }else{
                next();
            }
        })
    }else{
        next();
    }
})





mongoose.connect(conString).then(()=>{
    console.log("connected to mongoDB");

}).catch((err)=>{
    console.log(err);
    console.log("error connecting to mongoDB");
})



app.use("/api/users", userRouter);
app.use("/api/users/login", userRouter);
app.use("/api/gallery", gallerItemRouter);




app.listen(5000, (req,res)=>{
    console.log("server is running on port 5000");
})