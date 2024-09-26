import express from "express";
import cors from "cors";
import {
  students,
  lecturers,
  courses,
  admins,
  notifications,
} from "./mockData.mjs";

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// API Routes
app.get("/", (req, res) => {
  res.json("Welcome to the AttendEase Backend");
});

// Get all students for a specific admin
app.get("/admins/:adminId/students", (req, res) => {
  const { adminId } = req.params;
  const admin = admins.find((a) => a.id == adminId);

  if (admin) {
    const adminStudents = students.filter((s) => s.adminId == adminId); // Filter students by adminId
    res.json(adminStudents);
  } else {
    res.status(404).json({ message: "Admin not found" });
  }
});

// Get a specific student by ID for a specific admin
app.get("/admins/:adminId/students/:id", (req, res) => {
  const { adminId, id } = req.params;
  const admin = admins.find((a) => a.id == adminId);

  if (admin) {
    const student = students.find((s) => s.id == id && s.adminId == adminId); // Filter by both student ID and adminId
    if (student) {
      res.json(student);
    } else {
      res
        .status(404)
        .json({
          message: "Student not found or does not belong to this admin",
        });
    }
  } else {
    res.status(404).json({ message: "Admin not found" });
  }
});


app.post("/studLogin", async (req, res) => {
  try {
    const check = await students.find((a) => a.email ==  req.body.email)

    if (check.password === req.body.password) {
        res.status(201).send(check)
    }
    else {
        res.status(401).send("The password is incorrect")
    }
} catch (e) {
    res.status(404).send("User with this email does not exist")
}
});



// Add a new student for a specific admin
app.post("/admins/:adminId/students", (req, res) => {
  const { adminId } = req.params;
  const admin = admins.find((a) => a.id == adminId);

  if (admin) {
    const newStudent = {
      id: students.length + 1,
      studentMatric: req.body.studentMatric,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      fullName: `${req.body.firstName} ${req.body.lastName}`,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.lastName,
      department: req.body.department,
      courses: req.body.courses || [],
      adminId: adminId, // Associate the student with the admin
    };

    students.push(newStudent);
    res.status(201).json(newStudent);
  } else {
    res.status(404).json({ message: "Admin not found" });
  }
});

// Update a student for a specific admin
app.patch("/admins/:adminId/students/:id", (req, res) => {
  const { adminId, id } = req.params;
  const admin = admins.find((a) => a.id == adminId);

  if (admin) {
    const student = students.find((s) => s.id == id && s.adminId == adminId); // Filter by both student ID and adminId
    if (student) {
      Object.assign(student, req.body); // Update the student with the new data
      res.json(student);
    } else {
      res
        .status(404)
        .json({
          message: "Student not found or does not belong to this admin",
        });
    }
  } else {
    res.status(404).json({ message: "Admin not found" });
  }
});

// Delete a student for a specific admin
app.delete("/admins/:adminId/students/:id", (req, res) => {
  const { adminId, id } = req.params;
  const admin = admins.find((a) => a.id == adminId);

  if (admin) {
    const studentIndex = students.findIndex(
      (s) => s.id == id && s.adminId == adminId
    ); // Filter by both student ID and adminId
    if (studentIndex !== -1) {
      students.splice(studentIndex, 1); // Remove the student from the array
      res.json({ message: "Student deleted successfully" });
    } else {
      res
        .status(404)
        .json({
          message: "Student not found or does not belong to this admin",
        });
    }
  } else {
    res.status(404).json({ message: "Admin not found" });
  }
});

// Get all lecturers for a specific admin
app.get("/admins/:adminId/lecturers", (req, res) => {
  const { adminId } = req.params;
  const admin = admins.find((a) => a.id == adminId);

  if (admin) {
    const adminLecturers = lecturers.filter((l) => l.adminId == adminId); // Filter lecturers by adminId
    res.json(adminLecturers);
  } else {
    res.status(404).json({ message: "Admin not found" });
  }
});

// Get a specific lecturer by ID for a specific admin
app.get("/admins/:adminId/lecturers/:id", (req, res) => {
  const { adminId, id } = req.params;
  const admin = admins.find((a) => a.id == adminId);

  if (admin) {
    const lecturer = lecturers.find((s) => s.id == id && s.adminId == adminId); // Filter by both lecturer ID and adminId
    if (lecturer) {
      res.json(lecturer);
    } else {
      res
        .status(404)
        .json({
          message: "Lecturer not found or does not belong to this admin",
        });
    }
  } else {
    res.status(404).json({ message: "Admin not found" });
  }
});


app.post("/lectLogin", async (req, res) => {
  try {
    const check = await lecturers.find((a) => a.email ==  req.body.email)

    if (check.password === req.body.password) {
        res.status(201).send(check)
    }
    else {
        res.status(401).send("The password is incorrect")
    }
} catch (e) {
    res.status(404).send("User with this email does not exist")
}
});


// Add a new lecturer for a specific admin
app.post("/admins/:adminId/lecturers", (req, res) => {
  const { adminId } = req.params;
  const admin = admins.find((a) => a.id == adminId);

  if (admin) {
    const newLecturer = {
      id: lecturers.length + 1,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      fullName: `${req.body.firstName} ${req.body.lastName}`,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.lastName,
      department: req.body.department,
      coursesTaught: req.body.coursesTaught || [],
      adminId: adminId, // Associate the lecturer with the admin
    };

    lecturers.push(newLecturer);
    res.status(201).send(newLecturer);
  } else {
    res.status(404).send({ message: "Admin not found" });
  }
});

// Update a lecturer for a specific admin
app.patch("/admins/:adminId/lecturers/:id", (req, res) => {
  const { adminId, id } = req.params;
  const admin = admins.find((a) => a.id == adminId);

  if (admin) {
    const lecturer = lecturers.find((l) => l.id == id && l.adminId == adminId); // Filter by both lecturer ID and adminId
    if (lecturer) {
      Object.assign(lecturer, req.body); // Update the lecturer with the new data
      res.json(lecturer);
    } else {
      res
        .status(404)
        .json({
          message: "Lecturer not found or does not belong to this admin",
        });
    }
  } else {
    res.status(404).json({ message: "Admin not found" });
  }
});

// Delete a lecturer for a specific admin
app.delete("/admins/:adminId/lecturers/:id", (req, res) => {
  const { adminId, id } = req.params;
  const admin = admins.find((a) => a.id == adminId);

  if (admin) {
    const lecturerIndex = lecturers.findIndex(
      (l) => l.id == id && l.adminId == adminId
    ); // Filter by both lecturer ID and adminId
    if (lecturerIndex !== -1) {
      lecturers.splice(lecturerIndex, 1); // Remove the lecturer from the array
      res.json({ message: "Lecturer deleted successfully" });
    } else {
      res
        .status(404)
        .json({
          message: "Lecturer not found or does not belong to this admin",
        });
    }
  } else {
    res.status(404).json({ message: "Admin not found" });
  }
});

// Get all courses for a specific admin
app.get("/admins/:adminId/courses", (req, res) => {
  const { adminId } = req.params;
  const admin = admins.find((a) => a.id == adminId);

  if (admin) {
    const adminCourses = courses.filter((c) => c.adminId == adminId); // Filter courses by adminId
    res.json(adminCourses);
  } else {
    res.status(404).json({ message: "Admin not found" });
  }
});

// Get a specific course by ID for a specific admin
app.get("/admins/:adminId/courses/:id", (req, res) => {
  const { adminId, id } = req.params;
  const admin = admins.find((a) => a.id == adminId);

  if (admin) {
    const course = courses.find(
      (s) => s.courseId == id && s.adminId == adminId
    ); // Filter by both course ID and adminId
    if (course) {
      res.json(course);
    } else {
      res
        .status(404)
        .json({ message: "Course not found or does not belong to this admin" });
    }
  } else {
    res.status(404).json({ message: "Admin not found" });
  }
});

// Add a new course for a specific admin
app.post("/admins/:adminId/courses", (req, res) => {
  const { adminId } = req.params;
  const admin = admins.find((a) => a.id == adminId);

  if (admin) {
    const newCourse = {
      courseId: courses.length + 1,
      courseName: req.body.courseName,
      courseLecturer: req.body.courseLecturer,
      students: req.body.students || [],
      totalSessions: req.body.totalSessions || 0,
      adminId: adminId, // Associate the course with the admin
    };

    courses.push(newCourse);
    res.status(201).json(newCourse);
  } else {
    res.status(404).json({ message: "Admin not found" });
  }
});

// Update a course for a specific admin
app.patch("/admins/:adminId/courses/:id", (req, res) => {
  const { adminId, id } = req.params;
  const admin = admins.find((a) => a.id == adminId);

  if (admin) {
    const course = courses.find(
      (c) => c.courseId == id && c.adminId == adminId
    ); // Filter by both course ID and adminId
    if (course) {
      Object.assign(course, req.body); // Update the course with the new data
      res.json(course);
    } else {
      res
        .status(404)
        .json({ message: "Course not found or does not belong to this admin" });
    }
  } else {
    res.status(404).json({ message: "Admin not found" });
  }
});

// Delete a course for a specific admin
app.delete("/admins/:adminId/courses/:id", (req, res) => {
  const { adminId, id } = req.params;
  const admin = admins.find((a) => a.id == adminId);

  if (admin) {
    const courseIndex = courses.findIndex(
      (c) => c.courseId == id && c.adminId == adminId
    ); // Filter by both course ID and adminId
    if (courseIndex !== -1) {
      courses.splice(courseIndex, 1); // Remove the course from the array
      res.json({ message: "Course deleted successfully" });
    } else {
      res
        .status(404)
        .json({ message: "Course not found or does not belong to this admin" });
    }
  } else {
    res.status(404).json({ message: "Admin not found" });
  }
});

// Get all notifications for a specific admin
app.get("/admins/:adminId/notifications", (req, res) => {
  const { adminId } = req.params;
  const admin = admins.find((a) => a.id == adminId);

  if (admin) {
    const adminNotifications = notifications.filter(
      (n) => n.adminId == adminId
    );
    res.json(adminNotifications);
  } else {
    res.status(404).json({ message: "Admin not found" });
  }
});

// Add a new notification for a specific admin
app.post("/admins/:adminId/notifications", (req, res) => {
  const { adminId } = req.params;
  const admin = admins.find((a) => a.id == adminId);

  if (admin) {
    const newNotification = {
      id: notifications.length + 1,
      type: req.body.type, // General, Warning, Alert
      message: req.body.message,
      timestamp: new Date(),
      adminId: adminId, // Associate the notification with the admin
    };

    notifications.push(newNotification);
    res.status(201).json(newNotification);
  } else {
    res.status(404).json({ message: "Admin not found" });
  }
});

// Get all admins
app.get("/admins", async (req, res) => {
  res.json(admins);
});

// Get a specific admin by ID
app.get("/admins/:id", (req, res) => {
  const admin = admins.find((a) => a.id == req.params.id);
  if (admin) {
    res.json(admin);
  } else {
    res.status(404).json({ message: "Admin not found" });
  }
});

// Patch (update) an admin by ID
app.patch("/admins/:id", (req, res) => {
  const admin = admins.find((a) => a.id == req.params.id);

  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }

  if (req.body.firstName) {
    admin.firstName = req.body.firstName;
  }
  if (req.body.lastName) {
    admin.lastName = req.body.lastName;
    admin.fullName = `${req.body.firstName || admin.firstName} ${req.body.lastName}`; // Update fullName when lastName changes
  }
  if (req.body.email) {
    admin.email = req.body.email;
  }
  if (req.body.phoneNumber) {
    admin.phoneNumber = req.body.phoneNumber;
  }
  if (req.body.password) {
    admin.password = req.body.password; // Update password if provided
  }

  res.json(admin); // Send back the updated admin
});


app.post("/adminLogin", async (req, res) => {
  try {
    const check = await admins.find((a) => a.email ==  req.body.email)

    if (check.password === req.body.password) {
        res.status(201).send(check)
    }
    else {
        res.status(401).send("The password is incorrect")
    }
} catch (e) {
    res.status(404).send("User with this email does not exist")
}
});

// Add a new admin
app.post("/admins", (req, res) => {
  const newAdmin = {
    id: admins.length + 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    fullName: req.body.firstName + req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.lastName,
    lecturers: [],
    courses: [],
    students: [],
  };
  admins.push(newAdmin);
  res.status(201).json(newAdmin);
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
