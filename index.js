//API REST Task/index.js

const express = require('express');
const app = express();

const taskRoutes = require('./routes/taskRoutes');

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Usar las rutas de tareas
app.use('/api', taskRoutes);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});