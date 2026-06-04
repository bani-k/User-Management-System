require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB =
require("./config/db");

const authRoutes =
require("./routes/authRoutes");

const studentRoutes =
require("./routes/studentRoutes");

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

const path = require("path");

app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/register.html"));
});

app.use(
"/api/auth",
authRoutes
);

app.use(
"/api/students",
studentRoutes
);

const PORT =
process.env.PORT || 5000;

app.listen(PORT, () => {

console.log(
`Server running on ${PORT}`
);

});