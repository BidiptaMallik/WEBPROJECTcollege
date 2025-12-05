const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const { getScheduleBuilder } = require("../controllers/timetable");
const routineController = require("../controllers/routine");
const courseController=require("../controllers/course")

router.get("/home", isLoggedIn, getScheduleBuilder);

router.get('/main', isLoggedIn, function(req, res, next) {
  res.render('main', { user: req.user });
});


router.get("/schedule-builder", isLoggedIn, function (req, res) {
  res.redirect("home");
});

router.get("/", function (req, res) {
  let error = req.flash("error");
  res.render("index", { error });
});

router.get("/logout", isLoggedIn, function (req, res) {
  res.redirect("/");
});

router.get('/routine', isLoggedIn, routineController.getRoutinePage);
router.post('/routine/add', isLoggedIn, routineController.createTask);
router.post('/routine/toggle/:id', isLoggedIn, routineController.toggleStatus);
router.post('/routine/delete/:id', isLoggedIn, routineController.deleteTask);

router.get("/daily-routine", isLoggedIn, function (req, res) {
  res.redirect("routine");
});


router.get("/about", isLoggedIn, function (req, res) {
  res.render("about");
});

router.get("/timetable", isLoggedIn, function (req, res) {
  res.render("timetable");
});

router.get("/myaccount", isLoggedIn, (req, res) => {
  res.render("myaccount", { user: req.user });
});

router.get("/course", isLoggedIn, courseController.getCoursePage);

router.post("/course/register", isLoggedIn, courseController.registerCourses);

module.exports = router;
