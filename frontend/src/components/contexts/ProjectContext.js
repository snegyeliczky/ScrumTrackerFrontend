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


    /*Alert modal*/

    const[alertVisible,setAlertVisible]=useState(false);
    const [alertText,setAlertText] =useState("");
    const [alertType,setAlertType] =useState("")

    function handleAlertCancel() {
        setAlertVisible(false);
        setAlertText("")
    }

    function showErrorAlert(text) {
        setAlertType("error");
        setAlertText(text);
        setAlertVisible(true);
    }

    function showSuccessAlert(text) {
        setAlertType("success");
        setAlertText(text);
        setAlertVisible(true);
    }




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
                    participateProjects,

                    setAlertVisible,
                    alertVisible,
                    showErrorAlert,
                    showSuccessAlert,
                    handleAlertCancel,
                    alertType,
                    alertText

            }}
        >
            {props.children}
        </ProjectContext.Provider>
    )
};

