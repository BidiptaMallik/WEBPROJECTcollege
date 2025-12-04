const mongoose = require('mongoose');

const routineSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user' 
  },
  title: String,
  time: String, 
  category: {
    type: String,
    enum: ['Work', 'Health', 'Growth', 'Other'],
    default: 'Other'
  },
  description: String,
  status: {
    type: String,
    enum: ['active', 'done'],
    default: 'active'
  },
  icon: {
    type: String,
    default: '📝'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('routine', routineSchema);