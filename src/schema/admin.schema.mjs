import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  // id:{ type: Number , required: true},
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String },
  password: { type: String, required: true },
  lecturers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lecturer" }],
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }]
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
