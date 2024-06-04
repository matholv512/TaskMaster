const TaskService = require('../services/TaskService');

exports.index = async(req, res) => {
    if (!req.session.user) {
        res.status(200).render('home');
        return;
    }

    const task = new TaskService();
    const tasks = await task.allTasksByUser(req.session.user._id);

    res.status(200).render('homeAuth', { tasks });
};