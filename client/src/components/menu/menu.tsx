import React, { Component } from "react"
import "./menu.css"

export class Menu extends Component {

    public render(){
        return(
            <div className="menu">
                <a>מועדפים</a>
                <a>מחשבון שטחים</a>
                <a>הוספת נכס</a>
                <a>תגמול שותפים</a>
                <a>קבל הצעות אישיות</a>
                <a>לידים חמים</a>
            </div>
        );
    }

}  