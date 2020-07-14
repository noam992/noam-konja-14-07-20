const express = require("express");
const Task = require("../models/task");
const tasksLogic = require("../business-logic/tasks-logic");

// Create router
const router = express.Router();

// Get all tasks
router.get("/", async (request, response) => {
    try {
        const tasks = await tasksLogic.getAllTasksAsync();
        response.json(tasks);
    } catch (err) {
        response.status(500).send("Error: " + err.message)
    }
});

// Add task
router.post("/", async (request, response) => {
    try {
        const task = new Task(undefined,
                            request.body.userId,
                            request.body.text,
                            request.body.clientFirstName,
                            request.body.clientLastName,
                            request.body.clientPhoneNum,
                            request.body.clientEmail,
                            request.body.createdDate);
        
        const addedTask = await tasksLogic.addTaskAsync(task)
        response.status(201).json(addedTask);
    } catch (err) {
        response.status(500).send("Error: " + err.message)
    }
});

// Update partial task
router.patch("/:taskId", async (request, response) => {
    try {
        const task = new Task(+request.params.taskId,
                            request.body.userId,
                            request.body.text,
                            request.body.clientFirstName,
                            request.body.clientLastName,
                            request.body.clientPhoneNum,
                            request.body.clientEmail,
                            request.body.createdDate);
        
        const updatedTask = await tasksLogic.updatePartialTaskAsync(task);

        if (!updatedTask) {
            response.sendStatus(404);
            return;
        }

        response.json(updatedTask);
    } catch (err) {
        response.status(500).send("Error: " + err.message)
    }
});

// Delete task
router.delete("/:taskId", async (request, response) => {
    try {
        await tasksLogic.deleteTaskAsync(+request.params.taskId);
        response.sendStatus(204)
    } catch (err) {
        response.status(500).send("Error: " + err.message)
    }
});

module.exports = router

