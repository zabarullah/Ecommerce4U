import express from "express";
import {forgotPasswordController, loginController, protectedRouteController, signupController} from '../controllers/auth.controller.js'
import { isAdmin, requireSignIn } from "../middlewares/auth.middleware.js";


const router = express.Router();

// Routing
router.post('/signup',  signupController);
router.post('/login', loginController);
router.post('/forgot-my-password', forgotPasswordController)
router.get('/protected', requireSignIn, isAdmin, protectedRouteController);

//protected routed for user authenticated routes
router.get('/user-auth', requireSignIn, protectedRouteController);


export default router;