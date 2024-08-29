//API REST Task/

const Task = require('../models/task');

exports.getTasks = (req, res) => {
    res.json(Task.findAll());
};

exports.getTaskById = (req, res) => {
    const task = Task.findById(parseInt(req.params.id));
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
};

exports.createTask = (req, res) => {
    const newTask = new Task(Date.now(), req.body.title);
    Task.create(newTask);
    res.status(201).json(newTask);
};


exports.updateTask = (req, res) => {
    const updatedTask = Task.update(parseInt(req.params.id), req.body);
    if (updatedTask) {
        res.json(updatedTask);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
};

exports.deleteTask = (req, res) => {
    const deletedTask = Task.delete(parseInt(req.params.id));
    if (deletedTask) {
        res.json(deletedTask);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
};

exports.getTaskStatistics = (req, res) => {
    const tasks = Task.findAll();
    
    // Debugging: Verificar que tasks tiene los datos correctos
    console.log("Tasks found:", tasks);

    if (!tasks || tasks.length === 0) {
        console.log("No tasks found");
        return res.status(200).json({
            totalTasks: 0,
            mostRecentTask: null,
            oldestTask: null,
            completedTasks: 0,
            pendingTasks: 0
        });
    }

    const totalTasks = tasks.length;
    console.log("Total tasks:", totalTasks);

    const mostRecentTask = tasks.reduce((latest, task) => {
        return task.createdAt > latest.createdAt ? task : latest;
    }, tasks[0]);

    const oldestTask = tasks.reduce((oldest, task) => {
        return task.createdAt < oldest.createdAt ? task : oldest;
    }, tasks[0]);

    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;

    console.log("Statistics calculated:", {
        totalTasks,
        mostRecentTask,
        oldestTask,
        completedTasks,
        pendingTasks
    });

    return res.status(200).json({
        totalTasks,
        mostRecentTask: { id: mostRecentTask.id, title: mostRecentTask.title, createdAt: mostRecentTask.createdAt },
        oldestTask: { id: oldestTask.id, title: oldestTask.title, createdAt: oldestTask.createdAt },
        completedTasks,
        pendingTasks
    });
};
