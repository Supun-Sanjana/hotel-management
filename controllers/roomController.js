import Room from "../Models/room.js"
import {isAdminValid} from "../controllers/userController.js"

export function postRoom (req,res){
    if(!isAdminValid(req)){
        return res.status(403).json({ message: "Permission denied" });
    }

    const newRoom = new Room(req.body);
    newRoom.save()
    .then((result) => {
        res.json({
            message : "Room created successfully",
             result : result
        });
    })
    .catch((err) => {
        console.error(err);
        res.json({ 
            message: "Room creation failed" });
            console.log(err);
            
    });
}




export function deleteRoom(req, res){
    if(!isAdminValid){
        res.json({
            message:"Unautherized"
        })

    }

    const roomId = req.params.roomId;
    Room.deleteOne({roomId: roomId}).then(()=>{
        res.json({
            message:"Room deleted successfully"
        });
    }).catch(
        (err)=>{
            console.log(err);
            res.json({
                message:"Room deletion failed"
            });
            res.send(err)
            
        }
    )
}



export function findRoomByRoomId(req, res){

    const RoomId = req.params.roomId;
   
    

    Room.findOne({roomId: RoomId}).then((result)=>{
        if(result == null){
            res.status(404).json({
                message:"Room not found"
            });
        }else{
            res.json({
                message:"Room found",
                room:result
            });
        }
    }).catch(
        (err)=>{
            res.json({
                message:"Room searched failed",
                error:err
            });

        }
    )
}




export function getRooms (req, res){
    Room.find().then((result)=>{
        res.json({
            list: result
        })
    }).catch(
        (err)=>{
            res.json({
                message:"Failed to get rooms",
                error: err
            });
            console.log(err);
            
            
        }
    )
}



export function updateRoom(req, res){
    if(!isAdminValid(req)) {
        return res.status(403).json({ message: "Permission denied" });
   }
       
   const roomId = req.params.roomId;
   Room.findOneAndUpdate({ roomId: roomId },req.body).then(()=>{
       res.json({
           message : "Room updated successfully"
       });
   }).catch((err) => {
       console.error(err);
       res.json({ message: "Failed to update room" });
   })
}


export function getRoomsByCategory(req, res){
    const category = req.params.category
    Room.find({category : category}).then(
        (result)=>{
            res.json({
                result:result
            });
        }
    ).catch(
        (err)=>{
            res.json({
                message:"Failed to get room"
            });
        }
    )

}