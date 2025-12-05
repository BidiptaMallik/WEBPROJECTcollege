const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  selectedCourses: [{
    id: String,
    code: String,
    name: String,
    credits: Number,
    faculty: String,
    dept: String,
    slots: String,
    image: String
  }],
  totalCredits: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('CourseRegistration', courseSchema);