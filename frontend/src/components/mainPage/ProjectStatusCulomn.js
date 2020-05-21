import React from 'react';
import TaskCard from "./TaskCard";

const ProjectStatusCulomn = ({projectStatus}) => {

    let tasks = projectStatus.tasks;

    return (
        <div className={"projectStatusCulomn"}>
            <h2>{projectStatus.statusName}</h2>
            <div className={"taskContainer"}>
                {tasks.length > 0 &&
                tasks.map(task => (
                    <TaskCard task={task}/>
                ))}
            </div>


        </div>
    );
};

export default ProjectStatusCulomn;