import React, {useContext, useEffect, useState} from "react";
import {ProjectContext} from "../contexts/ProjectContext";
import AddNewProject from "./AddNewProject";
import ProjectCard from "./ProjectCard";
import {ContentContainer} from "../styledComps/styled"

const ProjectList = () => {

    const {getProjects, projects} = useContext(ProjectContext);

    useEffect(() => {
            getProjects();
        }, []
    );

    return (
        <div className="project_page">
            <ContentContainer><h2>Your Projects</h2></ContentContainer>
            <ContentContainer className="project_page__project_list_container">
                {projects.length === 0 ?
                    <div>You don't have any project yet.</div>
                    :
                    projects.map(project => (
                        <ProjectCard key={project.id} project={project}/>)
                    )}
            </ContentContainer>
            <AddNewProject/>
        </div>
    )
};

export default ProjectList;