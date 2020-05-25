import React, {useContext, useEffect, useState} from "react";
import {ProjectContext} from "../contexts/ProjectContext";
import AddNewProject from "./AddNewProject";
import ProjectCard from "./ProjectCard";

const ProjectList = () => {

    const {getProjects, projects} = useContext(ProjectContext);

    useEffect(() => {
            getProjects();
        }, []
    );

    return (
        <div className="project_page">
            <div className="project_page__project_list_container">
                {projects.length === 0 ?
                    <div>You don't have any project yet.</div>
                    :
                    projects.map(project => (
                        <ProjectCard key={project.id} project={project}/>)
                    )}
            </div>
            <AddNewProject/>
        </div>
    )
};

export default ProjectList;