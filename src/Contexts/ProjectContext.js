import React, {useState, createContext, useEffect} from "react";
import ProjectCalls from "../Services/ProjectCalls";
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
        let myProjects =await ProjectCalls.getMyProjects();
        setProjects(myProjects);
    };

    /*const getProjectsWithArchive = async () => {
        let response = await axios.get("http://localhost:8080/project/getmyprojectswitharchive");
        setProjects(response.data);
    };
*/
    const getArchiveProjects = async () => {
        let archiveProjects = await ProjectCalls.getArchiveProjects();
        setArchiveProjects(archiveProjects);
    };

    const getParticipatedProjects = async () => {
            let participatedProjects = await ProjectCalls.getParticipatedProjects();
            setParticipateProjects(participatedProjects);
        };


    /*Alert modal*/

    const[alertVisible,setAlertVisible]=useState(false);
    const [alertText,setAlertText] =useState("semmi");
    const [alertType,setAlertType] =useState("");

    function handleAlertCancel() {
        setAlertVisible(false);
        setAlertText("")
    }

    function showErrorAlert(text) {
        setAlertText(text);
        setAlertType("error");
        setAlertVisible(true);
    }

    function showSuccessAlert(text) {
        setAlertText(text);
        setAlertType("success");
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

