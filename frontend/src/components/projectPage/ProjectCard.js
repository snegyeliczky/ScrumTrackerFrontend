import React, {useContext} from 'react';
import {useHistory} from "react-router-dom";
import {ApiOutlined, DeleteOutlined} from "@ant-design/icons";
import {ContentContainer} from "../styledComps/styled";
import {ProjectContext} from "../contexts/ProjectContext";
import axios from "axios";

const ProjectCard = ({project, taskPercentageInProjectStatuses}) => {

    const history = useHistory();

    const {getProjects} = useContext(ProjectContext);

    const handleClick = () => {
        history.push("/project/" + project.id)
    };

    const startEndColor=taskPercentageInProjectStatuses.start-8;

    const inProgressStartColor = taskPercentageInProjectStatuses.start;
    const inProgressEndColorPercentage =(taskPercentageInProjectStatuses.start + taskPercentageInProjectStatuses.inProgress)-8;

    const finalColorStart = taskPercentageInProjectStatuses.start + taskPercentageInProjectStatuses.inProgress;
    const finalEndColorPercentage = taskPercentageInProjectStatuses.inProgress+taskPercentageInProjectStatuses.finish;

    const ProjectBackground = {

        background: `linear-gradient(90deg, rgba(55,58,85,0.8) 0% ${startEndColor}% ,
         rgba(253,192,29,0.8) ${inProgressStartColor}%  ${inProgressEndColorPercentage}% ,
         rgba(69,252,70,0.8) ${finalColorStart}%  ${finalEndColorPercentage}% )`
    };

    const handleDelete = async (e) => {
        e.stopPropagation();
        await axios.delete("http://localhost:8080/project/delete/" + project.id);
        getProjects();
    };

    const archiveProject = async (e) =>{
        e.stopPropagation();
        await axios.put("http://localhost:8080/project/archive/"+project.id);
        getProjects();

    };

    return (
        <div className={"project_card"} onClick={handleClick} style={ProjectBackground}>
            <div className={"status_tool_container"}>
                <DeleteOutlined onClick={(e) => handleDelete(e)}/>
                <ApiOutlined onClick={(e)=>archiveProject(e)} />
            </div>
            <ContentContainer><h2>{project.title}</h2></ContentContainer>
        </div>
    );
};

export default ProjectCard;