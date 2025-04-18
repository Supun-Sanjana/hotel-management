import express, { application } from 'express'

import { postRoom , getRooms, findRoomByRoomId, updateRoom, deleteRoom, getRoomsByCategory } from "../controllers/roomController.js";


const roomRouter = express.Router();

roomRouter.post("/", postRoom);

roomRouter.get("/", getRooms);
roomRouter.get("/:category", getRoomsByCategory);
roomRouter.get("/:roomId", findRoomByRoomId);


roomRouter.put("/:roomId", updateRoom);
roomRouter.delete("/:roomId", deleteRoom);


export default roomRouter;