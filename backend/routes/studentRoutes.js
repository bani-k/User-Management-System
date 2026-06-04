const express = require("express");

const Student =
require("../models/Student");

const authMiddleware =
require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const student = await Student.create({
      ...req.body,

      createdBy: req.user.id,
    });

    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 5;

    const search = req.query.search || "";

    const skip = (page - 1) * limit;

    const query = {
      $or: [
        {
          firstName: {
            $regex: search,
            $options: "i",
          },
        },

        {
          lastName: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    };

    const students = await Student.find(query).skip(skip).limit(limit).sort({
      createdAt: -1,
    });

    const total = await Student.countDocuments(query);

    res.json({
      students,

      page,

      totalPages: Math.ceil(total / limit),

      total,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.json(student);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(student);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.get("/dashboard/stats", authMiddleware, async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();

    const courseStats = await Student.aggregate([
      {
        $group: {
          _id: "$course",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    res.json({
      totalStudents,
      courseStats,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);

    res.json({
      message: "Student deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});



module.exports = router;