import React, {useState, createContext, useEffect} from "react";
import axios from "axios";

export const ProjectContext = createContext();

export const ProjectProvider = props => {

    const [projects, setProjects] = useState([]);
    const [showArchive,setShowArchive] = useState(false);

    useEffect(()=>{
        getProjects();
    },[showArchive]);

    const getProjects =()=>{
        showArchive?getProjectsWithArchive():getMyProjects();
    };

    const getMyProjects = async () => {
        let response = await axios.get("http://localhost:8080/project/getmyprojects");
        setProjects(response.data);
    };

    const getProjectsWithArchive = async () => {
        let response = await axios.get("http://localhost:8080/project/getmyprojectswitharchive");
        setProjects(response.data);
    };



    return (
        <ProjectContext.Provider
            value={{getProjects, projects,setProjects,setShowArchive,showArchive}}
        >
            {props.children}
        </ProjectContext.Provider>
    )
};

