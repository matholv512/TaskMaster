const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    priority: { type: String, required: true },
    finalDate: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, required: true },
    createdAt: { type: Date, default: Date.now }
});

const TaskModel = mongoose.model('Task', TaskSchema);

module.exports = TaskModel;