import React, {useContext} from 'react';
import {useHistory} from "react-router-dom";
import {DeleteOutlined} from "@ant-design/icons";
import {ContentContainer} from "../styledComps/styled";
import {ProjectContext} from "../contexts/ProjectContext";
import axios from "axios";

const ProjectCard = ({project}) => {

    const history = useHistory();

    const {getProjects} = useContext(ProjectContext);

    const handleClick = () => {
        history.push("/project/" + project.id)
    };

    const handleDelete = async (e) =>{
        e.stopPropagation();
        await axios.delete("http://localhost:8080/project/delete/"+project.id);
        getProjects();
    };

    return (
        <div className={"project_card"} onClick={handleClick}>
            <div className={"status_tool_container"}><DeleteOutlined onClick={(e)=>handleDelete(e)}/></div>
            <ContentContainer><h2>{project.title}</h2></ContentContainer>
        </div>
    );
};

export default ProjectCard;