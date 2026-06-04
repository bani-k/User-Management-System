const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
{
  studentId: {
    type: String,
    required: true,
    unique: true
  },

  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  phone: String,

  course: {
    type: String,
    required: true
  },

  semester: {
    type: Number,
    required: true
  },

  address: String,

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
},
{
  timestamps: true
}
);

studentSchema.index({
  firstName: "text",
  lastName: "text"
});

module.exports = mongoose.model("Student", studentSchema);