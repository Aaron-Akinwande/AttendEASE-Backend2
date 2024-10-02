import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import studentRoutes from "./routes/students.mjs";
import lecturerRoutes from "./routes/lecturers.mjs";
import courseRoutes from "./routes/courses.mjs";
import adminRoutes from "./routes/admins.mjs";
import notificationRoutes from "./routes/notifications.mjs";

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = 'mongodb://localhost:27017/AttendEASE';
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log('MongoDB connection error:', err));

// Route imports
app.use(studentRoutes);
app.use(lecturerRoutes);
app.use(courseRoutes);
app.use(adminRoutes);
app.use(notificationRoutes);

// Root route
app.get("/", (req, res) => {
  res.json("Welcome to the AttendEase Backend");
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
