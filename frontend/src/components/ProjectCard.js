import React from 'react';

const ProjectCard = (project) => {

    console.log(project);


    return (
        <div>
            <h2>{project.project.title}</h2>
        </div>
    );
};

export default ProjectCard;