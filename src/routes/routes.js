const express = require('express');
const route = express.Router();
const homeController = require('../controllers/homeController');
const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerController');
const taskController = require('../controllers/taskController');
const { loginRequired } = require('../middlewares/middlewares');

// Home
route.get('/', homeController.index);

// Login
route.get('/login', loginController.index);
route.post('/login', loginController.login);
route.get('/logout', loginRequired, loginController.logout);

// Register
route.get('/register', registerController.index);
route.post('/register', registerController.register);

// Tarefas
route.get('/create_task', loginRequired, taskController.index);
route.post('/create_task', loginRequired, taskController.createTask);
route.get('/edit_task/:id', loginRequired, taskController.indexEditTask);
route.post('/edit_task/:id', loginRequired, taskController.editTask);
route.get('/delete_task/:id', loginRequired, taskController.deleteTask);

module.exports = route;