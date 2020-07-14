const dal = require("../data-access-layer/dal");

// Get All tasks
async function getAllTasksAsync() {
    const sql = "SELECT * from tasks"
    const tasks = await dal.executeAsync(sql);
    return tasks
}

// Add task
async function addTaskAsync(task) {
    const sql = `INSERT INTO tasks(userId, text, clientFirstName, clientLastName, clientPhoneNum, clientEmail, createdDate) 
                VALUE('8',
                    '${task.text}',
                    '${task.clientFirstName}',
                    '${task.clientLastName}',
                    ${task.clientPhoneNum},
                    '${task.clientEmail}',
                    '2020-07-12T20:21:34.000Z')`
                
    const info = await dal.executeAsync(sql, [task.userId, task.text, task.clientFirstName, task.clientLastName, task.clientPhoneNum, task.clientEmail, task.createdDate]);
    task.taskId = info.insertId;
    return task;
};

// Update partial task
async function updatePartialTaskAsync(task){

    let sql = "UPDATE Tasks SET ";
    const values = [];

    if (task.userId !== undefined) {
        sql += ` userId = ${task.userId},`;
        values.push(task.userId); 
    }
    if (task.text !== undefined) {
        sql += ` text = '${task.text}',`;
        values.push(task.text);
    }
    if (task.clientFirstName !== undefined) {
        sql += ` clientFirstName = '${task.clientFirstName}',`;
        values.push(task.clientFirstName); 
    }
    if (task.clientLastName !== undefined) {
        sql += ` clientLastName = '${task.clientLastName}',`;
        values.push(task.clientLastName);
    }
    if (task.clientPhoneNum !== undefined) {
        sql += ` clientPhoneNum = ${task.clientPhoneNum},`;
        values.push(task.clientPhoneNum);
    }
    if (task.clientEmail !== undefined) {
        sql += ` clientEmail = '${task.clientEmail}',`;
        values.push(task.clientEmail);
    }
    if (task.createdDate !== undefined) {
        sql += ` createdDate = '${task.createdDate}',`;
        values.push(task.createdDate);
    }

    // Remove last comma
    sql = sql.substr(0, sql.length - 1); 

    sql += ` WHERE taskId = ${task.taskId}`;
    values.push(task.taskId);

    const info = await dal.executeAsync(sql ,values);
    return info.affectedRows === 0 ? null : task;

};

// Delete task
async function deleteTaskAsync(taskId){
    const sql = `DELETE FROM Tasks WHERE taskId = ${taskId}`;
    await dal.executeAsync(sql, [taskId]);
};

module.exports = {
    getAllTasksAsync,
    addTaskAsync,
    deleteTaskAsync,
    updatePartialTaskAsync
};