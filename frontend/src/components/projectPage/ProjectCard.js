import React from 'react';
import {useHistory} from "react-router-dom";

const ProjectCard = ({project}) => {

    const history = useHistory();

    const handleClick = () => {
        history.push("/project/" + project.id)
    };

    return (
        <div className={"project_card"} onClick={handleClick}>
            <h2 >{project.title}</h2>
        </div>
    );
};

export default ProjectCard;