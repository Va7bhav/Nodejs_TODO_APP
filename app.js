import express from "express";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
    path: "./data/config.env"
})

// using middlewares
// to send data in request
app.use(express.json())
// to get user getMyProfile()
app.use(cookieParser());

// using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);
app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    })
);


app.get("/", (req, res) => {
    res.send("Nice Working");
});

// using error Middleware
app.use(errorMiddleware)

