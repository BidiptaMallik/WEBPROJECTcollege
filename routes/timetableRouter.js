const express = require("express");
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn.js');
const { 
  getScheduleBuilder, 
  addScheduleItem, 
  deleteScheduleItem 
} = require("../controllers/timetable.js");


router.get("/home", isLoggedIn, getScheduleBuilder);


router.post("/api/schedule/add", isLoggedIn, addScheduleItem);


router.delete("/api/schedule/delete/:id", isLoggedIn, deleteScheduleItem);

module.exports = router;
