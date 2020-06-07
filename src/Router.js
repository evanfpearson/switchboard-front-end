import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Home from './Home'
import Lobby from "./Lobby";
import Game from "./Game"

function SwitchboardRouter() {
    return (
        <Router>
            <Switch>
                <Route path="/lobby/:code" component={Lobby}/>
                <Route path="/game/:code" component={Game}/>
                <Route path="/" component={Home}/>
            </Switch>
        </Router>
    );
}

export default SwitchboardRouter
