export const students = [
  {
    id: 1,
    adminId: 1, // Admin 1
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
    id: 2,
    adminId: 1, // Admin 1
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
    id: 3,
    adminId: 2, // Admin 2 (new)
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
    id: 4,
    adminId: 2, // Admin 2 (new)
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
  },{
    id: 5,
    adminId: 1, // Admin 1
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

export const lecturers = [
  {
    id: 1,
    adminId: 1, // Admin 1
    firstName: 'Alice',
    lastName: 'Brown',
    fullName: 'Alice Brown',
    email: 'alice.brown@example.com',
    phoneNumber: '1112223333',
    password: 'Brown',
    coursesTaught: [
      {
        courseId: 1,
        courseName: 'Mathematics 101',
        totalSessions: 10,
        students: ['John Doe', 'Jane Smith'],
      },
    ],
    department: 'Mathematics',
  },
  {
    id: 3,
    adminId: 2, // Admin 2 (new)
    firstName: 'Bob',
    lastName: 'Grey',
    fullName: 'Bob Grey',
    email: 'bob.grey@example.com',
    phoneNumber: '3334445555',
    password: 'Grey',
    coursesTaught: [
      {
        courseId: 3,
        courseName: 'Chemistry 101',
        totalSessions: 15,
        students: ['Emily Clark'],
      },
    ],
    department: 'Chemistry',
  },
  {
    id: 4,
    adminId: 2, // Admin 2 (new)
    firstName: 'Susan',
    lastName: 'Black',
    fullName: 'Susan Black',
    email: 'susan.black@example.com',
    phoneNumber: '9998887777',
    password: 'Black',
    coursesTaught: [
      {
        courseId: 4,
        courseName: 'Biology 202',
        totalSessions: 10,
        students: ['Michael Jordan'],
      },
    ],
    department: 'Biology',
  },
];

export const courses = [
  {
    courseId: 1,
    adminId: 1, // Admin 1
    courseName: 'Mathematics 101',
    courseLecturer: 'Dr. Alice Brown',
    students: [
      { 
        id: 1,
        name: 'John Doe', 
        attendedSessions: 5 
      },
      { 
        id: 2,
        name: 'Jane Smith', 
        attendedSessions: 5 
      },
    ],
    totalSessions: 10,
    totalStudents: 2,
  },
  {
    courseId: 2,
    adminId: 1, // Admin 1
    courseName: 'Physics 101',
    courseLecturer: '',
    students: [
      { 
        id: 1,
        name: 'John Doe', 
        attendedSessions: 8 
      },
      { 
        id: 2,
        name: 'Jane Smith', 
        attendedSessions: 7.5 
      },
    ],
    totalSessions: 10,
    totalStudents: 2,
  },
  {
    courseId: 3,
    adminId: 2, // Admin 2
    courseName: 'Chemistry 101',
    courseLecturer: 'Dr. Bob Grey',
    students: [
      { 
        id: 3,
        name: 'Emily Clark', 
        attendedSessions: 14.25 
      },
    ],
    totalSessions: 15,
    totalStudents: 1,
  },
  {
    courseId: 4,
    adminId: 2, // Admin 2
    courseName: 'Biology 202',
    courseLecturer: 'Dr. Susan Black',
    students: [
      { 
        id: 4,
        name: 'Michael Jordan', 
        attendedSessions: 7 
      },
    ],
    totalSessions: 10,
    totalStudents: 1,
  },
];




export const admins = [
  {
    id: 1,
    firstName: 'Admin',
    lastName: 'User',
    fullName: 'Admin User',
    email: 'admin@example.com',
    phoneNumber: '1234567890',
    password: 'User',
    lecturers: lecturers.filter((lecturer) => lecturer.adminId === 1),
    courses: courses.filter((course) => course.adminId === 1),
    students: students.filter((student) => student.adminId === 1),
  },
  {
    id: 2, // New admin
    firstName: 'Sarah',
    lastName: 'Williams',
    fullName: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    phoneNumber: '9876543210',
    password: 'Williams',
    lecturers: lecturers.filter((lecturer) => lecturer.adminId === 2),
    courses: courses.filter((course) => course.adminId === 2),
    students: students.filter((student) => student.adminId === 2),
  },
];

export const notifications = [
  {
    id: 1,
    adminId: 1, // Admin 1
    type: "General",
    message: "Welcome to the new academic session!",
    timestamp: new Date(),
  },
  {
    id: 2,
    adminId: 1, // Admin 1
    type: "Warning",
    message: "You have pending assignments due next week.",
    timestamp: new Date(),
  },
  {
    id: 3,
    adminId: 2, // Admin 2 (new)
    type: "Alert",
    message: "New lab materials have been uploaded for Biology 202.",
    timestamp: new Date(),
  },
];
