import React from 'react';

const ProjectCard = (project) => {

    console.log(project.id);

    return (
        <div>
            <h2>{project.title}</h2>
        </div>
    );
};

export default ProjectCard;