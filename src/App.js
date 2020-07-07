import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import MyProjects from "./Pages/ProjectPage/MyProjects";
import {ProjectProvider} from "./Contexts/ProjectContext";
import ProjectPage from "./Pages/ProjectPage/ProjectPage";
import Navbar from "./Parts/Navbar";
import HomePage from "./Pages/HomePage";
import AuthPage from "./Pages/AuthPage/AuthPage";
import AlertModal from "./components/alertModal";
import AuthCheck from "./Utils/AuthCheck";


function App() {
    return (
        <Router>
            <ProjectProvider>
                <div className="App">

                    <Route exact path="/" component={Navbar}/>
                    <Route exact path="/projects" component={Navbar}/>
                    <Route exact path="/project/:id" component={Navbar}/>

                    <Route exact path="/login" component={AuthCheck(AuthPage, false)}/>
                    <Route exact path="/project/:id" component={AuthCheck(ProjectPage, true)}/>
                    <Route exact path="/projects" component={AuthCheck(MyProjects, true)}/>
                    <Route exact path="/" component={AuthCheck(HomePage, true)}/>
                    <AlertModal/>
                </div>
            </ProjectProvider>
        </Router>

    )
        ;
}

export default App;
