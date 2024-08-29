let tasks = [
    
];

class Task {
    constructor(id, title, completed = false) {
        this.id = id;
        this.title = title;
        this.completed = completed;
        this.createdAt = new Date();  // Fecha de creación al momento de crear la tarea
    }

    static findAll() {
        return tasks;
    }

    static findById(id) {
        return tasks.find(task => task.id === id);
    }

    static create(task) {
        tasks.push(task);
        return task;
    }

    static update(id, updatedTask) {
        const index = tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            tasks[index] = { ...tasks[index], ...updatedTask };
            return tasks[index];
        }
        return null;
    }

    static delete(id) {
        const index = tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            return tasks.splice(index, 1)[0];  // Retorna la tarea eliminada
        }
        return null;
    }
}

module.exports = Task;
