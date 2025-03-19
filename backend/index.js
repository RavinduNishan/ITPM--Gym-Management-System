import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";

// Import Routes
import userRoutes from "./Routes/userRoutes.js";
import  Progress  from "./Models/progressmodel.js";


const app = express();

app.use(express.json()); // Middleware to parse JSON

app.use("/api", userRoutes); // User Routes


// Route for save a new book

app.post("/progress", async (req, res) => {
    try {
        if(
            !req.body.userId ||
            !req.body.taskid ||
            !req.body.status ||
            !req.body.progress
        ) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newProgress ={
            userId: req.body.userId,
            taskid: req.body.taskid,
            status: req.body.status,
            progress: req.body.progress,
            createdAt: req.body.createdAt

        }
        const progress = await Progress.create(newProgress);
        return res.status(201).json({ progress });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }  
});




app.get("/", (req, res) => {
    res.status(200).send("Welcome to the User Management API!");
});

// Connect to MongoDB and Start Server
mongoose.connect(mongoDBURL)
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error("MongoDB Connection Failed:", err));
