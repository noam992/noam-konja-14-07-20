import React, { Component } from "react"
import "./layout.css"
import { TasksApp } from "../tasks-app/tasks-app"
import { Header } from "../header/header"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import { Insert } from "../insert/insert"
import { PageNotFound } from "../page-not-found/page-not-found"

export class Layout extends Component {

    public render(){
        return(
            <div className="layout">
                <BrowserRouter>
                    <header>
                        <Header />
                    </header>
                    <main>
                        <Switch>
                            <Route path="/tasks" component={TasksApp} exact />
                            <Route path="/tasks/new" component={Insert} exact />
                            <Redirect from="/" to="/tasks" exact />
                            <Route component={PageNotFound} />
                        </Switch>
                    </main>
                </BrowserRouter>
            </div>
        );
    }

}  