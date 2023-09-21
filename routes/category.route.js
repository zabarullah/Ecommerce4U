import express  from "express";
import { isAdmin, requireSignIn } from "../middlewares/auth.middleware.js";
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from "../controllers/category.controller.js";

const router = express.Router();

// Routing
router.post('/create-category', requireSignIn, isAdmin, createCategoryController);
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);
router.get('/get-category',  categoryController);
router.get('/single-category/:slug',  singleCategoryController);
router.delete('/delete-cateogry/:id', requireSignIn, isAdmin, deleteCategoryController)



export default router;