import express from "express";
import{postBooking } from "../controllers/bookingController.js"

const bookingRouter = express.Router();

bookingRouter.post("/", postBooking);

export default bookingRouter;