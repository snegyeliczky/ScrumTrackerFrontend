import React, {useContext} from 'react';
import {useHistory} from "react-router-dom";
import {ApiOutlined, DeleteOutlined} from "@ant-design/icons";
import {ProjectContext} from "../../Contexts/ProjectContext";
import ProjectCalls from "../../Services/ProjectCalls";

const ProjectCard = ({project, taskPercentageInProjectStatuses}) => {

    const {showErrorAlert,showSuccessAlert} = useContext(ProjectContext);
    const history = useHistory();
    const {getProjects} = useContext(ProjectContext);

    const handleClick = () => {
        history.push("/project/" + project.id)
    };

    const startEndColor=taskPercentageInProjectStatuses.start;
    const inProgressEndColorPercentage =taskPercentageInProjectStatuses.start + taskPercentageInProjectStatuses.inProgress;
    const finalEndColorPercentage = taskPercentageInProjectStatuses.inProgress+taskPercentageInProjectStatuses.finish;

    const showArchiveStyle={
        color: project.archive?"red":"green",
    };

    const ProjectBackground = {

        background: `linear-gradient(90deg, rgba(124,33,33,0.8) 0% ${startEndColor}% ,
         rgba(253,192,29,0.8) ${startEndColor}%  ${inProgressEndColorPercentage}% ,
         rgba(69,252,70,0.8) ${inProgressEndColorPercentage}%  ${finalEndColorPercentage}% )`,
    };

    const handleDelete = async (e) => {
        e.stopPropagation();
        try {
            await ProjectCalls.deleteProject(project.id);
            getProjects();
        } catch (e) {
            showErrorAlert(e.response.data.errors)
        }

    };

    const archiveProject = async (e) =>{
        e.stopPropagation();
        await ProjectCalls.archiveProject(project.id);
        getProjects();

    };

    return (
        <div className={"project_card"} onClick={handleClick} style={ProjectBackground}>
            <div className={"project_tool_container"}>
                <DeleteOutlined onClick={(e) => handleDelete(e)}/>
                <ApiOutlined onClick={(e)=>archiveProject(e)} style={showArchiveStyle}/>
            </div>
            <div className={"project_card_title"}>{project.title}</div>
        </div>
    );
};

export default ProjectCard;