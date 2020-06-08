import React, {useState, createContext, useEffect} from "react";
import axios from "axios";

export const ProjectContext = createContext();

export const ProjectProvider = props => {

    const [projects, setProjects] = useState([]);
    const [archiveProjects, setArchiveProjects] = useState([]);
    const [showArchive,setShowArchive] = useState(false);
    const [participateProjects, setParticipateProjects] = useState([]);

    useEffect(() => {
        getProjects();
    },[]);

    const getProjects = () => {
        getMyProjects();
        getArchiveProjects();
        getParticipatedProjects();
    };

    const getMyProjects = async () => {
        let response = await axios.get("http://localhost:8080/project/getactiveprojects");
        setProjects(response.data);
    };

    /*const getProjectsWithArchive = async () => {
        let response = await axios.get("http://localhost:8080/project/getmyprojectswitharchive");
        setProjects(response.data);
    };
*/
    const getArchiveProjects = async () => {
        let response = await axios.get("http://localhost:8080/project/getarchiveprojects");
        setArchiveProjects(response.data);
    };

    const getParticipatedProjects = async () => {
            let response = await axios.get("http://localhost:8080/project/getparticipateprojects");
            setParticipateProjects(response.data);
        };



    return (
        <ProjectContext.Provider
            value={{getProjects,
                    projects,
                    setProjects,
                    setShowArchive,
                    showArchive,
                    archiveProjects,
                    getArchiveProjects,
                    setArchiveProjects,
                    participateProjects
            }}
        >
            {props.children}
        </ProjectContext.Provider>
    )
};

