import mongoose from "mongoose";
import Student from "./src/schema/studentSchema.mjs"; // Adjust the import path as necessary
import Admin from "./src/schema/admin.schema.mjs"; // Adjust the import path as necessary

// Connection string to your MongoDB database
const mongoURI = "mongodb://localhost:27017/AttendEASE"; // Update with your MongoDB URI

// Sample student data
const studentsData = [
  {
    adminId: "66fc139f063a0edb57cc9e63",
    studentMatric: 'STU001',
    firstName: 'John',
    lastName: 'Doe',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phoneNumber: '1234567890',
    password: 'Doe',
    courses: [
      {
        courseId: 1,
        courseName: 'Mathematics 101',
        courseLecturer: 'Dr. Alice Brown',
        totalSessions: 10,
        attendedSessions: 8,
        attendancePercentage: (8 / 10) * 100,
      },
    ],
    department: 'Computer Science',
  },
  {
    adminId: "66fc139f063a0edb57cc9e63",
    studentMatric: 'STU002',
    firstName: 'Jane',
    lastName: 'Smith',
    fullName: 'Jane Smith',
    email: 'jane.smith@example.com',
    phoneNumber: '0987654321',
    password: 'Smith',
    courses: [
      {
        courseId: 2,
        courseName: 'Physics 202',
        courseLecturer: 'Prof. Jane Smith',
        totalSessions: 12,
        attendedSessions: 11,
        attendancePercentage: (11 / 12) * 100,
      },
    ],
    department: 'Physics',
  },
  {
    adminId: "66fc139f063a0edb57cc9e63",
    studentMatric: 'STU003',
    firstName: 'Emily',
    lastName: 'Clark',
    fullName: 'Emily Clark',
    email: 'emily.clark@example.com',
    phoneNumber: '5554443333',
    password: 'Clark',
    courses: [
      {
        courseId: 3,
        courseName: 'Chemistry 101',
        courseLecturer: 'Dr. Bob Grey',
        totalSessions: 15,
        attendedSessions: 13,
        attendancePercentage: (13 / 15) * 100,
      },
    ],
    department: 'Chemistry',
  },
  {
    adminId: "66fc139f063a0edb57cc9e63",
    studentMatric: 'STU004',
    firstName: 'Michael',
    lastName: 'Jordan',
    fullName: 'Michael Jordan',
    email: 'michael.jordan@example.com',
    phoneNumber: '7778889999',
    password: 'Jordan',
    courses: [
      {
        courseId: 4,
        courseName: 'Biology 202',
        courseLecturer: 'Dr. Susan Black',
        totalSessions: 10,
        attendedSessions: 9,
        attendancePercentage: (9 / 10) * 100,
      },
    ],
    department: 'Biology',
  },
  {
    adminId: "66fc139f063a0edb57cc9e63",
    studentMatric: 'STU005',
    firstName: 'Jack',
    lastName: 'Daniels',
    fullName: 'Jack Daniels',
    email: 'Jack.Daniels@example.com',
    phoneNumber: '1234567890',
    password: 'Daniels',
    courses: [
      {
        courseId: 1,
        courseName: 'Mathematics 101',
        courseLecturer: 'Dr. Alice Brown',
        totalSessions: 10,
        attendedSessions: 8,
        attendancePercentage: (8 / 10) * 100,
      },
    ],
    department: 'Computer Science',
  },
];

async function seedStudents() {
  try {
    await mongoose.connect(mongoURI);

    // Clear existing students data (optional)
    await Student.deleteMany({});

    // Create new students
    await Student.insertMany(studentsData);
    
    console.log("Students seeded successfully!");
  } catch (error) {
    console.error("Error seeding students:", error);
  } finally {
    await mongoose.disconnect();
  }
}

seedStudents();
