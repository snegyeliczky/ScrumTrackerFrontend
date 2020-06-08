import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import MyProjects from "./components/projectPage/MyProjects";
import {ProjectProvider} from "./components/contexts/ProjectContext";
import ProjectPage from "./components/projectPage/ProjectPage";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import AuthPage from "./components/authPage/AuthPage";


function App() {
    return (
        <Router>
            <ProjectProvider>
                <div className="App">

                    <Route exact path="/" component={Navbar}/>
                    <Route exact path="/projects" component={Navbar}/>
                    <Route exact path="/project/:id" component={Navbar}/>

                    <Route exact path="/login" component={AuthPage}/>
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
