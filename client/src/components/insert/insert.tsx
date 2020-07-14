import React, { Component, ChangeEvent } from "react";
import "./insert.css";
import { TaskModel } from "../../models/task-model";
import { Config } from "../../config";
import axios from "axios";
import { NavLink } from "react-router-dom";


interface InsertState {
    task: TaskModel;
    errors: { clientFirstNameError: string,
                clientLastNameError: string,
                clientPhoneNumError: string,
                clientEmailError: string,
                createdDateError: string,
                textError: string};
}

export class Insert extends Component<any, InsertState> {

    constructor(props: any) {
        super(props);
        this.state = {
            task: new TaskModel(),
            errors: { clientFirstNameError: "*",
                        clientLastNameError: "*",
                        clientPhoneNumError: "*",
                        clientEmailError: "*",
                        createdDateError: "*",
                        textError: "*"}
        }
    }

    // Add task
    private addTask = async () => {
        try {
            const response = await axios.post<TaskModel>(Config.serverUrl + "/api/tasks", this.state.task);
            this.props.history.push("/tasks"); // Redirect to products page
        }
        catch (err) {
            alert(err.message);
        }
    }


    // Set info on client 
    private setClientFirstName = (args: ChangeEvent<HTMLInputElement>) => {
        const clientFirstName = args.target.value;
        let clientFirstNameError = "";

        if (clientFirstName === "") {
            clientFirstNameError = "חסר";
        }
        else if (clientFirstName.length > 30) {
            clientFirstNameError = "ארוך מידי";
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
            clientLastNameError = "חסר";
        }
        else if (clientLastName.length > 30) {
            clientLastNameError = "ארוך מידי";
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
            clientEmailError = "חסר";
        }
        else if (clientEmail.length > 30) {
            clientEmailError = "ארוך מידי";
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
            textError = "חסר";
        }

        const task = { ...this.state.task };
        task.text = text;
        this.setState({ task });

        const errors = { ...this.state.errors };
        errors.textError = textError;
        this.setState({ errors });
    }

    public render(){
        return(
            <div className="insert">
                <h2>הוסף משימה חדשה</h2>

                <div>שם פרטי</div>
                <input type="text" placeholder={`שם פרטי...`} 
                                    value={this.state.task.clientFirstName || undefined} 
                                    onChange={this.setClientFirstName} 
                                    size={30} />
                <div className="errBox">{this.state.errors.clientFirstNameError}</div>
                <br/>

                <div>שם משפחה</div>
                <input type="text" placeholder={`שם משפחה...`} 
                                    value={this.state.task.clientLastName || undefined} 
                                    onChange={this.setClientLastName} 
                                    size={30} />
                <div className="errBox">{this.state.errors.clientLastNameError}</div>
                <br/>

                <div>טלפון</div>
                <input type="number" placeholder={`טלפון...`} 
                                    value={this.state.task.clientPhoneNum || undefined} 
                                    onChange={this.setClientPhoneNum} 
                                    size={30} />
                <div className="errBox">{this.state.errors.clientPhoneNumError}</div>
                <br/>

                <div>אימייל</div>
                <input type="text" placeholder={`אימייל...`} 
                                    value={this.state.task.clientEmail || undefined} 
                                    onChange={this.setClientEmail} 
                                    size={30} />
                <div className="errBox">{this.state.errors.clientEmailError}</div>
                <br/>

                <div>מטלה</div>
                <textarea placeholder={`מטלה...`} 
                                    value={this.state.task.text || undefined} 
                                    onChange={this.setText} 
                                    cols={30} rows={10}></textarea>
                <div className="errBox">{this.state.errors.textError}</div>
                <br/>

                <button onClick={this.addTask}>Add</button>
                <br/><br/>
                <div>
                    <NavLink className="appLink" to="/tasks" exact>חזרה לעמוד משימות</NavLink>
                </div>
            </div>
        );
    }

} 