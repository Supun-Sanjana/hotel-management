import expess from "express";
import {postCategory, getCategory , deleteCategory, getCategoryByName, updateCategory} from "../controllers/categoryController.js";

const categoryRouter = expess.Router();

categoryRouter.post("/", postCategory);
categoryRouter.delete("/:name", deleteCategory)

categoryRouter.get("/", getCategory);
categoryRouter.get("/:name", getCategoryByName);

categoryRouter.put("/:name",updateCategory);


export default categoryRouter;