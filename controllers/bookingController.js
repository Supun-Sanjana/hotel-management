import Booking from "../Models/booking.js";
import { isCustomerValid } from "./userController.js";


export function postBooking(req, res){

    if(!isCustomerValid(req)) {
        return res.status(403).json({ message: "Permission denied" });
    }

    const startingId = 100;

    Booking.countDocuments({}).then((count)=>{
        console.log(count);
        const newId = startingId + count + 1;
        console.log(newId);
        
        const newBooking = new Booking({
            bookingId : newId,
            roomId : req.body.roomId,
            email : req.body.email,
            start : req.body.start,
            end : req.body.end,
            status : req.body.status,
            
        })

        newBooking.save().then((result)=>{
            res.json({
                message : "booking created successfully",
                result : result
            });
        }).catch((err)=>{
            console.error(err);
            res.json({ message: "Booking creation failed" });
        })
    
    
    }).catch((err)=>{
        console.error(err);
        res.json({ message: "Booking creation failed" });
    })


}
