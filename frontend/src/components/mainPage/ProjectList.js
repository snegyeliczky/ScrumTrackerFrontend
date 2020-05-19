import React, {useContext, useEffect} from "react";
import {ProjectContext} from "../contexts/ProjectContext";
import AddNewProject from "./AddNewProject";

const ProjectList =()=>{

    const {hello} = useContext(ProjectContext);

    useEffect(()=>{
        hello()
        },[]
    );

    return(
        <div>
            Projects
            <AddNewProject/>
        </div>
    )
};

export default ProjectList;