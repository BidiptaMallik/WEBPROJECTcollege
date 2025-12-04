const routineModel = require("../models/routine-model");

function getCategoryIcon(category) {
    switch(category) {
        case 'Work': return '💼';
        case 'Health': return '💪';
        case 'Growth': return '🌱';
        default: return '📝';
    }
}


exports.getRoutinePage = async function(req, res) {
    try {
       
        const tasks = await routineModel.find({ user: req.user._id });
        
        res.render('routine', { 
            user: req.user,
            routine: tasks, 
            date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        });
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
};


exports.createTask = async function(req, res) {
    try {
        await routineModel.create({
            user: req.user._id,
            title: req.body.title,
            time: req.body.time,
            category: req.body.category,
            description: req.body.description,
            icon: getCategoryIcon(req.body.category),
            status: 'active'
        });
        res.redirect('/routine');
    } catch (err) {
        console.error(err);
        res.redirect('/routine');
    }
};


exports.toggleStatus = async function(req, res) {
    try {
        const task = await routineModel.findOne({ _id: req.params.id, user: req.user._id });
        if (task) {
            task.status = task.status === 'active' ? 'done' : 'active';
            await task.save();
        }
        res.redirect('/routine');
    } catch (err) {
        console.error(err);
        res.redirect('/routine');
    }
};


exports.deleteTask = async function(req, res) {
    try {
        await routineModel.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        res.redirect('/routine');
    } catch (err) {
        console.error(err);
        res.redirect('/routine');
    }
};