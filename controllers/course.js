const CourseRegistration = require('../models/course-model');

module.exports.getCoursePage = async (req, res) => {
    try {
        let registration = await CourseRegistration.findOne({ user: req.user._id });
        
        res.render('course', { 
            savedCourses: registration ? registration.selectedCourses : [] 
        });

    } catch (err) {
        console.error("Error fetching courses:", err);
        res.status(500).send("Internal Server Error");
    }
};

module.exports.registerCourses = async (req, res) => {
    try {
        const { courses } = req.body;
        const userId = req.user._id;

        let totalCredits = 0;
        if(courses && courses.length > 0){
             totalCredits = courses.reduce((acc, course) => acc + (course.credits || 0), 0);
        }

        if (totalCredits > 24) {
            return res.status(400).json({ error: "Total credits cannot exceed 24." });
        }

        const updatedRegistration = await CourseRegistration.findOneAndUpdate(
            { user: userId },
            { 
                user: userId,
                selectedCourses: courses,
                totalCredits: totalCredits
            },
            { new: true, upsert: true } 
        );

        res.status(200).json({ message: "Registration successful!", data: updatedRegistration });

    } catch (err) {
        console.error("Registration Error:", err);
        res.status(500).json({ error: "Failed to register courses." });
    }
};