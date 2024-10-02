import express from "express";
import Admin from "../schema/admin.schema.mjs"

const router = express.Router();

// Get all admins
router.get("/admins", async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get a specific admin by ID
router.get("/admins/:id", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (admin) {
      res.json(admin);
    } else {
      res.status(404).json({ message: "Admin not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin login
router.post("/adminLogin", async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    if (admin && admin.password === req.body.password) {
      res.status(200).json(admin);
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add a new admin
router.post("/admins", async (req, res) => {
  try {
    const newAdmin = new Admin({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      fullName: `${req.body.firstName} ${req.body.lastName}`,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
    });
    await newAdmin.save();
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update admin by ID
router.patch("/admins/:id", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (admin) {
      admin.firstName = req.body.firstName || admin.firstName;
      admin.lastName = req.body.lastName || admin.lastName;
      admin.fullName = `${admin.firstName} ${admin.lastName}`;
      admin.email = req.body.email || admin.email;
      admin.phoneNumber = req.body.phoneNumber || admin.phoneNumber;
      admin.password = req.body.password || admin.password;

      await admin.save();
      res.json(admin);
    } else {
      res.status(404).json({ message: "Admin not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
