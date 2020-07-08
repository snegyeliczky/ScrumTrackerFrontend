import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import ScrumTable from "../../components/ProjectComponents/ScrumTable";
import {ContentContainer} from "../../Assets/StyledComps/styled";
import UsersModal from "../../components/ProjectComponents/UsersModal";
import MailModal from "../../components/MailModal";
import CustomPieChart from "../../components/ProjectComponents/CustomPieChart";
import ProjectCalls from "../../Services/ProjectCalls";
import InProgressLimitModal from "../../components/InProgressLimitModal";

const ProjectPage = () => {

    const {id} = useParams();
    const [project, setProject] = useState(null);
    const [scrumTable,setScrumTable] = useState(null);
    const [taskCount, setTaskCount] = useState({});
    const [businessValueCount, setBusinessValueCount] = useState({});
    const [usersOnProject, setUsersOnProject] = useState([]);

    function getColaboratorsFromProject(project) {
        return [...project.participants, project.author];

    }


    const getProject = async () => {

        let myProject = await ProjectCalls.getProject(id);

        setUsersOnProject(getColaboratorsFromProject(myProject));
        myProject.table.statuses.sort(function (a, b) {
            return a.position - b.position;
        });
        myProject.table.statuses.map(status => {
            status.tasks.sort(function (a, b) {
                return a.position - b.position;
            })
        });
        setScrumTable(myProject.table);
        setProject(null);
        setProject(myProject);
        getTaskChartData(myProject.table.statuses);
        getBusinessValueChartData(myProject.table.statuses);


    };

    const refreshScrumTableBackend = async () => {
        let newScrumTable = await ProjectCalls.getScrumTable(project.table.id);
        newScrumTable.statuses.sort(function (a, b) {
            return a.position - b.position;
        });
        newScrumTable.statuses.map(status =>{
            status.tasks.sort(function (a,b) {
                return a.position - b.position;
            });
        });
        getTaskChartData(newScrumTable.statuses);
        getBusinessValueChartData(newScrumTable.statuses);
        setScrumTable(newScrumTable);
    };

    function getTaskChartData(statuses) {
        let projectStatuses = statuses;
        let taskCounts = {start: 0, inProgress: 0, finish: 0};
        projectStatuses.map((status) => {
            if (status.position === 1) {
                taskCounts.start += status.tasks.length;
            } else if (status.position === projectStatuses.length) {
                taskCounts.finish += status.tasks.length;
            } else {
                taskCounts.inProgress += status.tasks.length;
            }
        });
        setTaskCount(taskCounts);
    }

    const getBusinessValueChartData = (statuses) => {
        let businessValueCount = {start: 0, inProgress: 0, finish: 0};
        statuses.map(status => {
            if (status.position === 1) {
                status.tasks.map(task => {
                    businessValueCount.start += task.priority;
                })
            } else if (status.position === statuses.length) {
                status.tasks.map(task => {
                    businessValueCount.finish += task.priority;
                })
            } else {
                status.tasks.map(task => {
                    businessValueCount.inProgress += task.priority;
                })
            }
        });
        setBusinessValueCount(businessValueCount);
    };

    const addNewColumn = async (columnName) => {
        let newStatus = {
            statusName: columnName,
            projectId: id
        };
        await ProjectCalls.addNewColumn(newStatus);
        getProject();
    };

    const addNewTask = async (taskName, statusId) => {
        let task = {
            statusId: statusId,
            title: taskName
        };
        await ProjectCalls.addNewTask(task);
        getProject();

    };

    useEffect(() => {
        getProject();
    }, []);

    if (!project) {
        return <div className="loading">loading....</div>

    }

    return (
        <div className={"project_item_container_canvas"}>
            <div className={"project_item_container"}>
                <ContentContainer>
                    <div className={"project_title_container"}>
                        <h2>{project.title}</h2>
                    </div>
                    <UsersModal projectId={project.id} participants={project.participants}/>
                    <MailModal projectId={project.id}/>
                    <InProgressLimitModal tableId={project.table.id}
                                          getProject={getProject}
                                          taskLimit={project.table.taskLimit}
                    />
                </ContentContainer>

                <div className={"scrum_table_container"}>
                    <ScrumTable key={scrumTable.id}
                                table={scrumTable}
                                addNewColumn={addNewColumn}
                                addNewTask={addNewTask}
                                setTaskCount={setTaskCount}
                                tasksDistributionInStatuses={getTaskChartData}
                                usersOnProject={usersOnProject}
                                countBusinessValue={getBusinessValueChartData}
                                refreshScrumTableBackend={refreshScrumTableBackend}
                                projectAuthor = {project.author.username}

                    />
                </div>
                <div className="chart_container">
                    <CustomPieChart data={taskCount}
                                    visualMark={"percentage"}
                                    label="Sprint progress by user story"/>
                    <CustomPieChart data={businessValueCount}
                                    visualMark={"value"}
                                    label="Sprint progress by value distribution"/>
                </div>
            </div>
            }
        </div>
    );
};

export default ProjectPage;