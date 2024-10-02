import express from "express";
import Lecturer from "../schema/lecturerSchema.mjs"; // Import Lecturer schema
import Admin from "../schema/admin.schema.mjs"; // Import Admin schema

const router = express.Router();

// Get all lecturers for a specific admin
router.get("/admins/:adminId/lecturers", async (req, res) => {
  const { adminId } = req.params;

  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const lecturers = await Lecturer.find({ adminId });
    res.json(lecturers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get a specific lecturer by ID for a specific admin
router.get("/admins/:adminId/lecturers/:id", async (req, res) => {
  const { adminId, id } = req.params;

  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const lecturer = await Lecturer.findOne({ _id: id, adminId });
    if (!lecturer) {
      return res
        .status(404)
        .json({ message: "Lecturer not found or does not belong to this admin" });
    }

    res.json(lecturer);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Lecturer login
router.post("/lectLogin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const lecturer = await Lecturer.findOne({ email });
    if (!lecturer) {
      return res.status(404).send("User with this email does not exist");
    }

    if (lecturer.password === password) {
      res.status(201).send(lecturer);
    } else {
      res.status(401).send("The password is incorrect");
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Add a new lecturer for a specific admin
router.post("/admins/:adminId/lecturers", async (req, res) => {
  const { adminId } = req.params;
  const { firstName, lastName, email, phoneNumber, password, department, coursesTaught } = req.body;

  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const newLecturer = new Lecturer({
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      email,
      phoneNumber,
      password,
      department,
      coursesTaught: coursesTaught || [],
      adminId
    });

    await newLecturer.save();
    res.status(201).json(newLecturer);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Update a lecturer for a specific admin
router.patch("/admins/:adminId/lecturers/:id", async (req, res) => {
  const { adminId, id } = req.params;

  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const lecturer = await Lecturer.findOneAndUpdate({ _id: id, adminId }, req.body, { new: true });
    if (!lecturer) {
      return res
        .status(404)
        .json({ message: "Lecturer not found or does not belong to this admin" });
    }

    res.json(lecturer);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Delete a lecturer for a specific admin
router.delete("/admins/:adminId/lecturers/:id", async (req, res) => {
  const { adminId, id } = req.params;

  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const lecturer = await Lecturer.findOneAndDelete({ _id: id, adminId });
    if (!lecturer) {
      return res
        .status(404)
        .json({ message: "Lecturer not found or does not belong to this admin" });
    }

    res.json({ message: "Lecturer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
