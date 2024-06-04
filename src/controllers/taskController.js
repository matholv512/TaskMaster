const TaskService = require('../services/TaskService');

// createTask
exports.index = (req, res) => {
    return res.status(200).render('createTask');
};

exports.createTask = (req, res) => {
    try {
        const userId = req.session.user._id;
        const task = new TaskService(req.body, userId);
        task.createTask();

        if (task.errors.length > 0) {
            req.flash('errors', task.errors);
            req.session.save(() => {
                return res.redirect('/create_task');
            });
            return;
        }

        req.flash('success', 'Tarefa criada com sucesso.');
        req.session.save(() => {
            return res.redirect('/');
        });
    } catch (e) {
        console.log(e);
        res.status(500).render('errorPage');
    }
};

// editTask
exports.indexEditTask = async (req, res) => {
    let task = new TaskService();
    task = await task.searchTaskById(req.params.id, req.session.user._id);
    if (!task) return res.status(500).render('errorPage');
    return res.status(200).render('editTask', { task });
};

exports.editTask = (req, res) => {
    try {
        const task = new TaskService(req.body);
        task.editTask(req.params.id);

        if (task.errors.length > 0) {
            req.flash('errors', task.errors);
            req.session.save(() => {
                return res.redirect(`/edit_task/${req.params.id}`);
            });
            return;
        }

        req.flash('success', 'Tarefa Editada com sucesso.');
        req.session.save(() => {
            return res.redirect('back');
        });
    } catch (e) {
        console.log(e);
        res.status(500).render('errorPage');
    }
};

// deleteTask
exports.deleteTask = (req, res) => {
    try {
        const task = new TaskService();
        task.deleteTask(req.params.id, req.session.user._id);

        if (task.errors.length > 0) {
            req.flash('errors', task.errors);
            req.session.save(() => {
                return res.redirect('/');
            });
        }

        req.flash('success', 'Tarefa Excluída com sucesso.');
        req.session.save(() => {
            return res.redirect('/');
        });
    } catch (e) {
        console.log(e);
        res.status(500).render('errorPage');
    }
};