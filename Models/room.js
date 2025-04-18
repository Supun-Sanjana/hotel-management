import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomId:{
        type:"String",
        required:true,
        unique: true
    },
    category:{
        type:String,
        required:true
    },
    avaliable:{
        type:Boolean,
        required:true,
        default:true
    },
    maxGuests:{
        type:Number,
        required: true,
        default: 3,
    },
    photos:[{
        type:String
    }],
    SpecialDescription:{
        type:String,
        default:""
    },
    note:{
        type:String,
        default:""
    }
})



const Room = mongoose.model("Rooms", roomSchema)

export default Room;