import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomId:{
        type:"String",
        required:true
    },
    category:{
        requred:true
    },
    avaliable:{
        type:Boolean,
        required:true
    },
    maxGuest:{
        type:Number,
        required: true
    },
    photos:[{
        type:String
    }],
    SpecialDescription:{
        type:String
    }
})








const Room = mongoose.model("Rooms", roomSchema)

export default Room;