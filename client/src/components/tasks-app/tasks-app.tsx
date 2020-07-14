import React, { Component, ChangeEvent, MouseEventHandler } from "react"
import "./tasks-app.css"
import { TaskModel } from "../../models/task-model";
import axios from "axios";
import { Config } from "../../config";
import { NavLink } from "react-router-dom";

interface TasksAppState {
    tasks: TaskModel[];
    task: TaskModel;
    errors: { clientFirstNameError: string,
                clientLastNameError: string,
                clientPhoneNumError: string,
                clientEmailError: string,
                createdDateError: string,
                textError: string};
    currentContentCollapse: number;
    isSameContentOpen: number;
    currentEditCollapse: number;
    isSameEditOpen: number;
    isLoading: boolean;
}

export class TasksApp extends Component<any, TasksAppState> {

    public constructor(props: any){
        super(props);
        this.state = {
            tasks: [],
            task: new TaskModel(),
            errors: { clientFirstNameError: "*",
                        clientLastNameError: "*",
                        clientPhoneNumError: "*",
                        clientEmailError: "*",
                        createdDateError: "*",
                        textError: "*"},
            currentContentCollapse: undefined,
            isSameContentOpen: undefined,
            currentEditCollapse: undefined,
            isSameEditOpen: undefined,
            isLoading: false
        }
    }

    // Display tasks
    public async componentDidMount() {
        try {
            const response = await axios.get<TaskModel[]>(Config.serverUrl + "/api/tasks");
            const tasks = response.data;
            this.setState({ tasks })            
        } catch (err) {
            console.log("Error: " + err.message)
        }
    }

    // Set info on client 
    private setClientFirstName = (args: ChangeEvent<HTMLInputElement>) => {
        const clientFirstName = args.target.value;
        let clientFirstNameError = "";

        if (clientFirstName === "") {
            clientFirstNameError = "פספסת למלא";
        }
        else if (clientFirstName.length > 30) {
            clientFirstNameError = "שם ארוך מידי";
        }

        const task = { ...this.state.task };
        task.clientFirstName = clientFirstName;
        this.setState({ task });

        const errors = { ...this.state.errors };
        errors.clientFirstNameError = clientFirstNameError;
        this.setState({ errors });
    }

    private setClientLastName = (args: ChangeEvent<HTMLInputElement>) => {
        const clientLastName = args.target.value;
        let clientLastNameError = "";

        if (clientLastName === "") {
            clientLastNameError = "פספסת למלא";
        }
        else if (clientLastName.length > 30) {
            clientLastNameError = "שם ארוך מידי";
        }

        const task = { ...this.state.task };
        task.clientLastName = clientLastName;
        this.setState({ task });

        const errors = { ...this.state.errors };
        errors.clientLastNameError = clientLastNameError;
        this.setState({ errors });
    }

    private setClientPhoneNum = (args: ChangeEvent<HTMLInputElement>) => {
        const clientPhoneNum = +args.target.value;
        let clientPhoneNumError = "";

        if (clientPhoneNum < 0) {
            clientPhoneNumError = "אין אפשרות למספר שלילי";
        }

        const task = { ...this.state.task };
        task.clientPhoneNum = clientPhoneNum;
        this.setState({ task });

        const errors = { ...this.state.errors };
        errors.clientPhoneNumError = clientPhoneNumError;
        this.setState({ errors });
    }

    private setClientEmail = (args: ChangeEvent<HTMLInputElement>) => {
        const clientEmail = args.target.value;
        let clientEmailError = "";

        if (clientEmail === "") {
            clientEmailError = "Missing name";
        }
        else if (clientEmail.length > 30) {
            clientEmailError = "Name too long";
        }

        const task = { ...this.state.task };
        task.clientEmail = clientEmail;
        this.setState({ task });

        const errors = { ...this.state.errors };
        errors.clientEmailError = clientEmailError;
        this.setState({ errors });
    }

    private setText = (args: ChangeEvent<HTMLTextAreaElement>) => {
        const text = args.target.value;
        let textError = "";

        if (text === "") {
            textError = "פספסת למלא";
        }

        const task = { ...this.state.task };
        task.text = text;
        this.setState({ task });

        const errors = { ...this.state.errors };
        errors.textError = textError;
        this.setState({ errors });
    }

    // Patch task
    private patchTask = async (taskId, args) => {
        try {
            const response = await axios.patch<TaskModel>(Config.serverUrl + "/api/tasks/" + taskId, this.state.task);
            const addedTask = response.data;

            const tasks = this.state.tasks
            const currentTaskChanged = tasks.filter( t => t.taskId === addedTask.taskId) 

            if (addedTask.text !== undefined) {
                currentTaskChanged[0].text = addedTask.text;
                this.setState({ tasks });
            }
            if (addedTask.clientFirstName !== undefined) {
                currentTaskChanged[0].clientFirstName = addedTask.clientFirstName;
                this.setState({ tasks });
            }
            if (addedTask.clientLastName !== undefined) {
                currentTaskChanged[0].clientLastName = addedTask.clientLastName;
                this.setState({ tasks });
            }
            if (addedTask.clientPhoneNum !== undefined) {
                currentTaskChanged[0].clientPhoneNum = addedTask.clientPhoneNum;
                this.setState({ tasks });
            }
            if (addedTask.clientEmail !== undefined) {
                currentTaskChanged[0].clientEmail = addedTask.clientEmail;
                this.setState({ tasks });
            }

        }
        catch (err) {
            alert(err.message);
        }
    }

    // DELETE task
    private deleteTask = async (args) => {
        try {
            const taskId = args.target.value === "" ? undefined : +args.target.value;
            await axios.delete(Config.serverUrl + "/api/tasks/" + taskId)
        } catch (err) {
            console.log(err.message)
        }
    }

    // Collapse content
    private showContent = (args) => {
        if (+args.target.value === this.state.isSameContentOpen) {
            this.setState({currentContentCollapse: null, isSameContentOpen: undefined })
        }
        else{
            this.setState({currentContentCollapse: +args.target.value, isSameContentOpen: +args.target.value})
        }
    }

    // Edit task
    private editTask = (args) => {
        // Collapse for edit
        if (+args.target.value === this.state.isSameEditOpen) {
            this.setState({currentEditCollapse: null, isSameEditOpen: undefined })
        }
        else{
            this.setState({currentEditCollapse: +args.target.value, isSameEditOpen: +args.target.value})
        }

        // Clear error edit mode
        const errors = { ...this.state.errors };
        errors.clientFirstNameError = "*"
        errors.clientLastNameError = "*"
        errors.clientPhoneNumError = "*"
        errors.clientEmailError = "*"
        errors.createdDateError = "*"
        this.setState({ errors });

        // Clear input filled 
        const task = { ...this.state.task };
        task.clientFirstName = undefined;
        task.clientLastName = undefined;
        task.clientPhoneNum = undefined;
        task.clientEmail = undefined;
        this.setState({ task });

    }

    public render(){
        return(
            <div className="tasks-app">
                <NavLink className="insertLink" to="/tasks/new" exact>הוסף משימה חדשה</NavLink>
                <br/><br/>
                <div className="tasksTable">
                    <table>
                        <thead>
                            <tr className="tableHeader">
                                <th>שם משתמש</th>
                                <th>טלפון</th>
                                <th>מייל</th>
                                <th>תאריך יצירת משימה</th>
                                <th>פעולות</th>
                            </tr>
                        </thead>
                        {this.state.tasks.map( t => 
                            <tbody key={t.taskId}>
                                <tr>
                                    <td>{t.clientLastName} {t.clientFirstName}</td>
                                    <td>{t.clientPhoneNum}</td>
                                    <td>{t.clientEmail}</td>
                                    <td>{t.createdDate}</td>
                                    <td className="operation-box">
                                        <div>
                                            <input type="image" 
                                                src="/assets/images/symbols/smartagent-view.png" 
                                                value={t.taskId || undefined} 
                                                onClick={this.showContent} />
                                        </div>
                                        <div>
                                            <input type="image" 
                                                src="/assets/images/symbols/smartagent-edit.png" 
                                                value={t.taskId || undefined} 
                                                onClick={this.editTask} />
                                        </div>
                                        <div>
                                            <input type="image" 
                                                src="/assets/images/symbols/smartagent-delete.png" 
                                                value={t.taskId || undefined} 
                                                onClick={this.deleteTask} />
                                        </div>
                                    </td>
                                </tr>
                                {this.state.currentEditCollapse === t.taskId ?
                                    <tr>
                                        <td>
                                            <input type="text" placeholder={`שם פרטי: `+ t.clientFirstName} 
                                                                value={this.state.task.clientFirstName || undefined} 
                                                                onChange={this.setClientFirstName} />
                                            <div className="errBox">{this.state.errors.clientFirstNameError}</div>
                                            <input type="text" placeholder={`שם משפחה: `+ t.clientLastName} 
                                                                value={this.state.task.clientLastName || undefined} 
                                                                onChange={this.setClientLastName} />
                                            <div className="errBox">{this.state.errors.clientLastNameError}</div>
                                        </td>
                                        <td>
                                            <input type="number" placeholder={`טלפון: `+ t.clientPhoneNum} 
                                                                value={this.state.task.clientPhoneNum || undefined} 
                                                                onChange={this.setClientPhoneNum} />
                                            <div className="errBox">{this.state.errors.clientPhoneNumError}</div>
                                        </td>
                                        <td>
                                            <input type="text" placeholder={`אימייל: `+ t.clientEmail} 
                                                                value={this.state.task.clientEmail || undefined} 
                                                                onChange={this.setClientEmail} />
                                            <div className="errBox">{this.state.errors.clientEmailError}</div>
                                        </td>
                                        <td>
                                            <textarea placeholder={`מטלה: `+ t.text} 
                                                        value={this.state.task.text || undefined} 
                                                        onChange={this.setText} 
                                                        cols={30} rows={10}></textarea>
                                        </td>
                                        <td>
                                            <button onClick={this.patchTask.bind(this, t.taskId)}>שלח</button>
                                        </td>
                                    </tr> : null }
                                <tr>
                                    <td colSpan={5} className="trContentBox">
                                        {this.state.currentContentCollapse === t.taskId ? <div className="content">{t.text}</div> : null }
                                    </td>
                                </tr>
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        );
    }

}  