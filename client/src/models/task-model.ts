export class TaskModel {

    public constructor(

        public taskId?: number,
        public userId?: number,
        public text?: string,
        public clientFirstName?: string,
        public clientLastName?: string,
        public clientPhoneNum?: number,
        public clientEmail?: string,
        public createdDate?: string
    ){}

}