import React, {useContext, useEffect, useState} from "react";
import {ProjectContext} from "../contexts/ProjectContext";
import AddNewProject from "./AddNewProject";
import ProjectCard from "./ProjectCard";
import {ContentContainer} from "../styledComps/styled"
import {ApiOutlined} from "@ant-design/icons";

const ProjectList = () => {

    const {getProjects, projects, setShowArchive, showArchive} = useContext(ProjectContext);

    useEffect(() => {
            getProjects();
        }, []
    );


    function tasksDistributionInStatuses(project) {
        let projectStatuses = project.table.statuses;
        let taskCounts = {start: 0, inProgress: 0, finish: 0, all: 0};
        projectStatuses.map((status) => {
            taskCounts.all += status.tasks.length;
            if (status.position === 1) {
                taskCounts.start += status.tasks.length;
            } else if (status.position === projectStatuses.length) {
                taskCounts.finish += status.tasks.length;
            } else {
                taskCounts.inProgress += status.tasks.length;
            }
        });
        console.log(taskCounts);
        return taskCounts;
    }

    function countTaskPercentageInProjectStatuses(project) {

        let taskPercentageInStatuses = tasksDistributionInStatuses(project);
        for (let [key, value] of Object.entries(taskPercentageInStatuses)) {
            taskPercentageInStatuses[key] = parseInt(((taskPercentageInStatuses[key] / taskPercentageInStatuses.all) * 100).toFixed(0));
        }
        return taskPercentageInStatuses;
    }

    const showArchiveStyle={
        fontSize: "35px",
        color: showArchive?"green":"red",
        right: "10%",
        position: "absolute",
    };

    return (
        <div className="project_page">
            <ContentContainer>
                <h2>Your Projects</h2>

                <ApiOutlined onClick={(e) => setShowArchive(!showArchive)} style={showArchiveStyle}/>

            </ContentContainer>
            <ContentContainer className="project_page__project_list_container">
                {projects.length === 0 ?
                    <div>You don't have any project yet.</div>
                    :
                    projects.map((project) => {
                            console.log(project.archive);
                            let taskPercentageInProjectStatuses = countTaskPercentageInProjectStatuses(project);
                            return <ProjectCard key={project.id}
                                                project={project}
                                                taskPercentageInProjectStatuses={taskPercentageInProjectStatuses}/>
                        }
                    )}
            </ContentContainer>
            <AddNewProject/>
        </div>
    )
};

export default ProjectList;