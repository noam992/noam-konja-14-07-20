import React, { Component } from "react"
import "./header.css"
import { Menu } from "../menu/menu"

export class Header extends Component {

    public render(){
        return(
            <div className="header">
                <div className="logo-box">
                    <img src="/assets/images/symbols/YourSpace_logo.png" alt="companyLogo"/>
                    <img src="/assets/images/symbols/w.png" alt="whatAppSymbol"/>
                    <img src="/assets/images/symbols/e.png" alt="emailSymbol"/>
                    <span>077-9985041</span>
                </div>
                <div className="menu-box">
                    <Menu />
                </div>
            </div>
        );
    }

}  