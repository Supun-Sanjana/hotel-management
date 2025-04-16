import mongoose from "mongoose";

const userSchema =  mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
       
    },
    lastName: {
        type: String,
        
    },
    image :{
        type: String,
        default: "https://www.w3schools.com/howto/img_avatar.png"
    },
    type: {
        type: String,
        default: "user",
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    disabled: {
        type: Boolean,
        default: false,
        required: true,
    },
    emailVerified: {
        type: Boolean,
        default: false,
        required: true,
    },
   
});



const User = mongoose.model("User", userSchema);
                           // This is the model name, it will be used to create the collection in the database
// The collection name will be "users" in the database

export default User;