import express from "express";
import Course from "../schema/courseSchema.mjs"; // Import Course schema
import Admin from "../schema/admin.schema.mjs"; // Import Admin schema

const router = express.Router();

// Get all courses for a specific admin
router.get("/admins/:adminId/courses", async (req, res) => {
  const { adminId } = req.params;

  try {
    // Check if the admin exists
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Fetch courses associated with the admin
    const courses = await Course.find({ adminId });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get a specific course by ID for a specific admin
router.get("/admins/:adminId/courses/:id", async (req, res) => {
  const { adminId, id } = req.params;

  try {
    // Check if the admin exists
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Fetch the course by course ID and admin ID
    const course = await Course.findOne({ _id: id, adminId });
    if (!course) {
      return res
        .status(404)
        .json({ message: "Course not found or does not belong to this admin" });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Add a new course for a specific admin
router.post("/admins/:adminId/courses", async (req, res) => {
  const { adminId } = req.params;
  const { courseName, courseLecturer, students, totalSessions } = req.body;

  try {
    // Check if the admin exists
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Create a new course
    const newCourse = new Course({
      courseName,
      courseLecturer,
      students: students || [],
      totalSessions: totalSessions || 0,
      totalStudents: students ? students.length : 0, // Automatically calculate total students
      adminId: adminId, // Associate the course with the admin
    });

    // Save the course to the database
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Update a course for a specific admin
router.patch("/admins/:adminId/courses/:id", async (req, res) => {
  const { adminId, id } = req.params;

  try {
    // Check if the admin exists
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Find and update the course
    const updatedCourse = await Course.findOneAndUpdate(
      { _id: id, adminId },
      req.body,
      { new: true }
    );
    if (!updatedCourse) {
      return res
        .status(404)
        .json({ message: "Course not found or does not belong to this admin" });
    }

    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Delete a course for a specific admin
router.delete("/admins/:adminId/courses/:id", async (req, res) => {
  const { adminId, id } = req.params;

  try {
    // Check if the admin exists
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Delete the course
    const deletedCourse = await Course.findOneAndDelete({ _id: id, adminId });
    if (!deletedCourse) {
      return res
        .status(404)
        .json({ message: "Course not found or does not belong to this admin" });
    }

    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
