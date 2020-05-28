import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import LoginPage from "./components/authPage/Login";
import MyProjects from "./components/projectPage/MyProjects";
import RegistrationPage from "./components/authPage/Registration";
import {ProjectProvider} from "./components/contexts/ProjectContext";
import ProjectPage from "./components/projectPage/ProjectPage";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";


function App() {
    return (
        <Router>
            <ProjectProvider>
                <div className="App">
                    <Navbar/>
                    <Route exact path="/registration" component={RegistrationPage}/>
                    <Route exact path="/login" component={LoginPage}/>
                    <Route exact path="/project/:id" component={ProjectPage}/>
                    <Route exact path="/projects" component={MyProjects}/>
                    <Route exact path="/" component={HomePage}/>
                </div>
            </ProjectProvider>
        </Router>
    )
        ;
}

export default App;
