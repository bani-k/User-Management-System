# Student Management System
## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Logout Functionality

### User Profile

* View Logged-in User Profile
* Update Username
* Change Password

### Student Management

* Add Student
* View All Students
* Search Students
* Edit Student Information
* Delete Students
* View Student Profile

### Dashboard

* Total Student Count
* Course-wise Statistics
* Protected Dashboard Access

### Advanced Features

* Pagination
* Search Filtering
* MongoDB Database Integration
* Responsive User Interface

---

## Technology Stack

### Frontend

* HTML5
* CSS3
* Vanilla JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JWT (JSON Web Tokens)
* bcryptjs

---

## Project Structure

student-management-system/

backend/

* config/

  * db.js
* middleware/

  * authMiddleware.js
* models/

  * User.js
  * Student.js
* routes/

  * authRoutes.js
  * studentRoutes.js
* .env
* package.json
* server.js

frontend/

* css/

  * style.css
* js/

  * login.js
  * register.js
  * dashboard.js
  * students.js
  * add-student.js
  * edit-student.js
  * profile.js
  * student-profile.js
* login.html
* register.html
* dashboard.html
* students.html
* add-student.html
* edit-student.html
* profile.html
* student-profile.html

---

## Database Design

### Users Collection

Fields:

* username
* email
* password (hashed)
* createdAt
* updatedAt

### Students Collection

Fields:

* studentId
* firstName
* lastName
* email
* phone
* course
* semester
* address
* createdBy
* createdAt
* updatedAt

---

## API Routes

### Authentication Routes

POST /api/auth/register

* Register new user

POST /api/auth/login

* Login user
* Returns JWT token

GET /api/auth/me

* Get logged-in user details

PUT /api/auth/update-profile

* Update username

PUT /api/auth/change-password

* Change password

---

### Student Routes

POST /api/students

* Add student

GET /api/students

* Get all students
* Supports pagination and search

GET /api/students/:id

* Get student profile

PUT /api/students/:id

* Update student

DELETE /api/students/:id

* Delete student

GET /api/students/dashboard/stats

* Dashboard statistics

---

## Authentication Flow

1. User registers an account.
2. User logs in using email and password.
3. Backend verifies credentials.
4. JWT token is generated.
5. Token is stored in browser localStorage.
6. Protected API requests include:

Authorization: Bearer <token>

7. Backend validates token before allowing access.

---

## Search Functionality

Students can be searched by:

* First Name
* Last Name

Search uses MongoDB regular expressions for partial matching.

Example:

John
Joh
jo

All return matching results.

---

## Pagination

Student listing supports pagination.

Example:

GET /api/students?page=1&limit=5

Features:

* Previous Page
* Next Page
* Dynamic Page Numbers

---

## Dashboard Statistics

Dashboard displays:

* Total Students
* Course-wise Student Count

Statistics are generated using MongoDB aggregation.

---

## User Profile

Users can:

* View profile information
* Update username
* Change password

Password updates use bcrypt hashing before storage.

---

## Security Features

* Password hashing using bcryptjs
* JWT authentication
* Protected API routes
* Passwords never stored in plain text

---

## Installation

### 1. Clone Repository

git clone <repository-url>

### 2. Open Backend Folder

cd backend

### 3. Install Dependencies

npm install

### 4. Create .env File

Create a file named .env inside backend folder.

Add:

PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/student_management

JWT_SECRET=my_secret_key

### 5. Start MongoDB

Open a terminal and run:

mongod

Keep this terminal running.

### 6. Start Backend Server

npm run dev

or

node server.js

Expected Output:

MongoDB Connected
Server running on 5000

### 7. Open Application

Visit:

http://localhost:5000

---

## Default Workflow

1. Register a new account.
2. Login.
3. Access Dashboard.
4. Add Students.
5. Search Students.
6. Edit Students.
7. View Student Profiles.
8. Delete Students.
9. Update User Profile.
10. Change Password.

