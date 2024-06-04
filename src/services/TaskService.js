const TaskModel = require('../models/TaskModel');

class Task {
    constructor(body, userId) {
        this.body = body;
        this.errors = [];
        this.userId = userId;
    }

    validate() {
        this.cleanUp();

        if (this.body.title.length >= 50) this.errors.push('O título é muito longo.');

        if (this.body.description.length >= 1000) this.errors.push('A descrição é muito longa.');

        if (!this.body.title) this.errors.push('O campo "Título" é obrigatório.');

        if (!this.body.finalDate) this.errors.push('O campo "Data final" é obrigatório.');
    }

    cleanUp() {
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            title: this.body.title,
            description: this.body.description,
            priority: this.body.priority,
            user: this.userId,
            finalDate: this.body.finalDate
        };
    }

    async createTask() {
        this.validate();

        if (this.errors.length > 0) return;

        await TaskModel.create(this.body);
    }

    async editTask(id) {
        this.validate();

        if (this.errors.length > 0) return;

        await TaskModel.findByIdAndUpdate(id, this.body, { new: true });
    }

    async searchTaskById(id, userId) {
        try {
            const task = await TaskModel.findOne({ _id: id, user: userId });
            return task;
        } catch (e) {
            this.errors.push('Tarefa não encontrada.');
        }
    }

    async allTasksByUser(userId) {
        const tasks = await TaskModel.find({ user: userId }).sort({ createdAt: -1 });
        return tasks;
    }

    async deleteTask(id, userId) {
        const task = await TaskModel.deleteOne({ _id: id, user: userId });
    }
}

module.exports = Task;