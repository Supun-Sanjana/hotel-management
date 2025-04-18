import express from 'express';
import { postGalleryItem, getGalleryItem, deleteGalleryItem } from '../controllers/gallerItemController.js';

import { verifyJWT } from '../verifyJWT.js';


const gallerItemRouter = express.Router();

gallerItemRouter.get("/" , getGalleryItem);
gallerItemRouter.post("/" ,verifyJWT, postGalleryItem);
gallerItemRouter.delete("/" , deleteGalleryItem);


export default gallerItemRouter;