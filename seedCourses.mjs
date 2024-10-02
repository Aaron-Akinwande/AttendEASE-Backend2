import mongoose from "mongoose";
import Course from "./schema/course.schema.mjs"; // Adjust the import path as necessary

// Connection string to your MongoDB database
const mongoURI = "mongodb://localhost:27017/AttendEASE"; // Update with your MongoDB URI

// Sample course data
const coursesData = [
  {
    courseId: 1,
    adminId: "66fc139f063a0edb57cc9e63",
    courseName: "Mathematics 101",
    courseLecturer: "Dr. Alice Brown",
    students: [
      { id: 1, name: "John Doe", attendedSessions: 5 },
      { id: 2, name: "Jane Smith", attendedSessions: 5 },
    ],
    totalSessions: 10,
    totalStudents: 2,
  },
  {
    courseId: 2,
    adminId: "66fc139f063a0edb57cc9e63",
    courseName: "Physics 101",
    courseLecturer: "",
    students: [
      { id: 1, name: "John Doe", attendedSessions: 8 },
      { id: 2, name: "Jane Smith", attendedSessions: 7.5 },
    ],
    totalSessions: 10,
    totalStudents: 2,
  },
  {
    courseId: 3,
    adminId: "66fc139f063a0edb57cc9e63",
    courseName: "Chemistry 101",
    courseLecturer: "Dr. Bob Grey",
    students: [
      { id: 3, name: "Emily Clark", attendedSessions: 14.25 },
    ],
    totalSessions: 15,
    totalStudents: 1,
  },
  {
    courseId: 4,
    adminId: "66fc139f063a0edb57cc9e63",
    courseName: "Biology 202",
    courseLecturer: "Dr. Susan Black",
    students: [
      { id: 4, name: "Michael Jordan", attendedSessions: 7 },
    ],
    totalSessions: 10,
    totalStudents: 1,
  },
];

async function seedCourses() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing courses data (optional)
    await Course.deleteMany({});

    // Create new courses
    await Course.insertMany(coursesData);
    
    console.log("Courses seeded successfully!");
  } catch (error) {
    console.error("Error seeding courses:", error);
  } finally {
    await mongoose.disconnect();
  }
}

seedCourses();
