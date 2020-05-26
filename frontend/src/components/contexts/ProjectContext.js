import React, {useState, createContext, useEffect} from "react";
import axios from "axios";

export const ProjectContext = createContext();

export const ProjectProvider = props => {

    const [projects, setProjects] = useState([]);

    const getProjects = async () => {
        let response = await axios.get("http://localhost:8080/project/getmyprojects");
        setProjects(response.data);
    };



    return (
        <ProjectContext.Provider
            value={{getProjects, projects,setProjects}}
        >
            {props.children}
        </ProjectContext.Provider>
    )
};

