class Task {
    
    constructor(taskId, userId, text, clientFirstName, clientLastName, clientPhoneNum, clientEmail, createdDate) {

        this.taskId = taskId;
        this.userId = userId;
        this.text = text;
        this.clientFirstName = clientFirstName;
        this.clientLastName = clientLastName;
        this.clientPhoneNum = clientPhoneNum;
        this.clientEmail = clientEmail;
        this.createdDate = createdDate;

    }

}

module.exports = Task