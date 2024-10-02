// const mongoose = require('mongoose');

import mongoose from "mongoose";

const lecturerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String },
  password: { type: String, required: true },
  department: { type: String, required: true },
  coursesTaught: [
    {
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
      courseName: String,
      totalSessions: Number,
      students: [{ type: String }],
    }
  ]
});

const Lecturer = mongoose.model('Lecturer', lecturerSchema);
export default Lecturer;