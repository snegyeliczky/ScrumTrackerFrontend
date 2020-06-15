import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import MyProjects from "./Pages/ProjectPage/MyProjects";
import {ProjectProvider} from "./Contexts/ProjectContext";
import ProjectPage from "./Pages/ProjectPage/ProjectPage";
import Navbar from "./Parts/Navbar";
import HomePage from "./Pages/HomePage";
import AuthPage from "./Pages/AuthPage/AuthPage";
import AlertModal from "./components/alertModal";


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
                    <AlertModal/>
                </div>
            </ProjectProvider>
        </Router>
    )
        ;
}

export default App;
