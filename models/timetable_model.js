const mongoose = require('mongoose');

const scheduleItemSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  day: { type: String, enum: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], required: true },
  subject: { type: String, required: true },
  faculty: String,
  room: String,
  start: String,
  end: String,
  course: String,
  section: String
}, { timestamps: true });

module.exports = mongoose.model('ScheduleItem', scheduleItemSchema);
