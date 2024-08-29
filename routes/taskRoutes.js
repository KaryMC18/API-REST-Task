//API REST Task/routes/taskRoutes.js

const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

router.get('/tasks', taskController.getTasks);
router.get('/tasks/:id', taskController.getTaskById);
router.post('/tasks', taskController.createTask);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);
router.get('/tasks/statistics', taskController.getTaskStatistics);


module.exports = router;
