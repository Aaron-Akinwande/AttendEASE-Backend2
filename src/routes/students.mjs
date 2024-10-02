import express from "express";
import Student from "../schema/studentSchema.mjs"; // Import Student schema
import Admin from "../schema/admin.schema.mjs"; // Import Admin schema

const router = express.Router();

// Get all students for a specific admin
router.get("/admins/:adminId/students", async (req, res) => {
  const { adminId } = req.params;

  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const students = await Student.find({ adminId });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get a specific student by ID for a specific admin
router.get("/admins/:adminId/students/:id", async (req, res) => {
  const { adminId, id } = req.params;

  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const student = await Student.findOne({ _id: id, adminId });
    if (!student) {
      return res.status(404).json({ message: "Student not found or does not belong to this admin" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Student login
router.post("/studLogin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).send("User with this email does not exist");
    }

    if (student.password === password) {
      res.status(201).send(student);
    } else {
      res.status(401).send("The password is incorrect");
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Add a new student for a specific admin
router.post("/admins/:adminId/students", async (req, res) => {
  const { adminId } = req.params;
  const { studentMatric, firstName, lastName, email, phoneNumber, password, department, courses } = req.body;

  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const newStudent = new Student({
      studentMatric,
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      email,
      phoneNumber,
      password,
      department,
      courses: courses || [],
      adminId // Associate the student with the admin
    });

    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Update a student for a specific admin
router.patch("/admins/:adminId/students/:id", async (req, res) => {
  const { adminId, id } = req.params;

  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const student = await Student.findOneAndUpdate({ _id: id, adminId }, req.body, { new: true });
    if (!student) {
      return res.status(404).json({ message: "Student not found or does not belong to this admin" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Delete a student for a specific admin
router.delete("/admins/:adminId/students/:id", async (req, res) => {
  const { adminId, id } = req.params;

  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const student = await Student.findOneAndDelete({ _id: id, adminId });
    if (!student) {
      return res.status(404).json({ message: "Student not found or does not belong to this admin" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
