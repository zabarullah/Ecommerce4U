import userModel from '../models/user.model.js';
import { comparePassword, hashPassword } from './../helpers/auth.helpers.js';
import JWT  from 'jsonwebtoken';

export const signupController = async (req, res) => {
    try {
        // Check if required fields are missing
        const { name, email, password, address, phone } = req.body;
        if (!name || !email || !password || !address || !phone) {
            return res.status(400).json({ message: 'required fields need to be completed' });
        };
        
        // Check if an exisiting user with the given email already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(401).json({ 
                message: 'email already exists',
                success: false,
            });
        };
        
        // Register user
        const hashedPassword = await hashPassword(password);
        // save hashedPassword
        const user = await new userModel({ name, email, password:hashedPassword, address, phone }).save();
        res.status(201).json({ 
            message: 'user created successfully', 
            success: true,
            user, 
        });
  } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: 'server error',
            success: false,
        });
    }
};


export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validation of user credentials within form(req.body)
        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: 'invalid email or password'
            })
        };

        // Find user by email in userModel
        const user = await userModel.findOne({ email });
        // Check if user exists
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'email not registered'
            })
        };
        // compare the passwords
        const matchedPassword = await comparePassword(password, user.password);
        if (!matchedPassword) {
            return res.status(401).json({
                success: false,
                message: 'invalid email or password'
            })
        };

        // Token
        const token = JWT.sign({ _id:user._id }, process.env.JWT_SECRET, {expiresIn: '1d'});
        res.status(200).json({            
            success: true,
            message: 'logged in successfully',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            },
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'error in login',
            error
        })
    }
};

//protected route testing controller

export const protectedRouteController = (req, res) => {
    res.status(200).json({
        ok: true,
        message: 'Protected Route accessed',
    })
};