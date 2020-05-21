import React, {useContext, useEffect, useState} from "react";
import {ProjectContext} from "../contexts/ProjectContext";
import AddNewProject from "./AddNewProject";
import ProjectCard from "./ProjectCard";

const ProjectList =()=>{

    const {getProjects, projects} = useContext(ProjectContext);

    useEffect(()=>{
        getProjects();
        },[]
    );

    return(
        <div>
            Project
            {projects.length === 0 ?
                <h1>loading...</h1>
                :
                projects.map(project =>(
                <ProjectCard key={project.id} project={project}/>)
            )}
            <AddNewProject/>
        </div>
    )
};

export default ProjectList;