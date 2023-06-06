import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode=200) => {
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
    res.status(statusCode).cookie("token", token, {
        http: true,
        maxAge: 1000 * 60 * 15,
        sameSite: process.env.NODE_ENV === "Development"? "lax": "none",
        secure: process.env.NODE_ENV === "Developement"? false: true
    }).json({
        success: true,
        message
    })
}