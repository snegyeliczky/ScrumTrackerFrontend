import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import LoginPage from "./components/Login";
import MainPage from "./components/mainPage/MainPage";
import RegistrationPage from "./components/Registration";


function App() {
    return (
        <Router>
            <div className="App">
                <Route exact path="/registration" component={RegistrationPage}/>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/" component={MainPage}/>
            </div>
        </Router>
    );
}

export default App;
