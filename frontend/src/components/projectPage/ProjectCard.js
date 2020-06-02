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


    const ProjectBackgroud = {
        background: "linear-gradient(90deg, rgba(112,107,116,1) 0% 25% ," +
            " rgba(253,192,29,1) 25% 50%," +
            " rgba(69,252,70,1) 50% 100%)"
    };

    const handleDelete = async (e) =>{
        e.stopPropagation();
        await axios.delete("http://localhost:8080/project/delete/"+project.id);
        getProjects();
    };

    return (
        <div className={"project_card"} onClick={handleClick} style={ProjectBackgroud}>
            <div className={"status_tool_container"}><DeleteOutlined onClick={(e)=>handleDelete(e)}/></div>
            <ContentContainer><h2>{project.title}</h2></ContentContainer>
        </div>
    );
};

export default ProjectCard;