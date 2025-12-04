const ScheduleItem = require('../models/timetable_model');

module.exports.getScheduleBuilder = async function(req, res, next) {
  try {
    const items = await ScheduleItem.find({ user: req.user._id });

    const scheduleData = {
      "Mon": [], "Tue": [], "Wed": [], "Thu": [],
      "Fri": [], "Sat": [], "Sun": []
    };

    items.forEach(item => {
      const formattedItem = {
        id: item._id,
        day: item.day,
        subject: item.subject,
        faculty: item.faculty,
        room: item.room,
        start: item.start,
        end: item.end,
        course: item.course,
        section: item.section
      };

      scheduleData[item.day].push(formattedItem);
    });


    res.render('home', { scheduleData });
  } catch (err) {
    next(err);
  }
};


module.exports.addScheduleItem = async function(req, res) {
  try {
    const newItem = await ScheduleItem.create({
      user: req.user._id,
      day: req.body.day,
      subject: req.body.subject,
      faculty: req.body.faculty,
      room: req.body.room,
      start: req.body.start,
      end: req.body.end,
      course: req.body.course,
      section: req.body.section
    });

    res.json(newItem);
  } catch (err) {
    console.error("Error adding schedule:", err);
    res.status(500).json({ error: 'Failed to save item' });
  }
};


module.exports.deleteScheduleItem = async function(req, res) {
  try {
    const deleted = await ScheduleItem.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!deleted)
      return res.status(404).json({ error: "Item not found or unauthorized" });

    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    console.error("Error deleting schedule:", err);
    res.status(500).json({ error: 'Failed to delete item' });
  }
};
