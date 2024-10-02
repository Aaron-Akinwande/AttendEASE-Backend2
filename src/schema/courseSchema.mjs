

import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  courseLecturer: { type: String, required: true }, // Name of the lecturer
  students: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
      name: String,
      attendedSessions: Number
    }
  ],
  totalSessions: { type: Number, required: true },
  totalStudents: { type: Number, required: true }
});

const Course = mongoose.model('Course', courseSchema);
export default Course;