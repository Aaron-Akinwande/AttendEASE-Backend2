// const mongoose = require('mongoose');

import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  studentMatric: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String },
  password: { type: String, required: true },
  department: { type: String, required: true },
  courses: [
    {
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
      courseName: String,
      courseLecturer: String,
      totalSessions: Number,
      attendedSessions: Number,
      attendancePercentage: Number,
    }
  ]
});


const Student = mongoose.model('Student', studentSchema);
export default Student;