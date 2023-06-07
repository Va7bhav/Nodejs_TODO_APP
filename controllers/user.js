import { User } from "../models/user.js"
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/features.js"
import ErrorHandler from "../middlewares/error.js";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            return res.status(404).json({
                success: false,
                message: "User Already Exist"
            })
        }
        if (user) return next(new ErrorHandler("User Already Exists!", 404));

        const hashedPassword = await bcrypt.hash(password, 10)

        user = await User.create({ name, email, password: hashedPassword })

        sendCookie(user, res, "Registered Successfully", 201)
    } catch (error) {
        next(error)
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");

        if (!user) return next(new ErrorHandler("Invalid Email or Password", 404));

        const isMatch = await bcrypt.compare(password, user.password);

        // if (!isMatch) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "Invalid Input"
        //     })
        // }

        if (!isMatch) return next(new ErrorHandler("Invalid Email or Password"));

        sendCookie(user, res, `Welcome back, ${user.name}`, 200)
    } catch (error) {
        next(error)
    }
};

export const logout = (req, res) => {   
    res.status(200).cookie("token", null, {
        sameSite: process.env.NODE_ENV === "Developement" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Developement" ? false : true,
        expires: new Date(Date.now())
    }).json({
        success: true
    })
};

export const getMyProfile = (req, res) => {

    res.status(200).json({
        success: true,
        user: req.user
    })

};