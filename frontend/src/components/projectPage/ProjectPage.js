import React, {useState, useContext, useEffect, useRef} from 'react';
import {useParams} from "react-router";
import axios from "axios";
import ScrumTable from "./ScrumTable";
import {AdderComponent, ContentContainer, Input} from "../styledComps/styled";
import UsersModal from "./UsersModal";
import MailModal from "./MailModal";
import {PieChart} from 'react-minimal-pie-chart';
import CustomPieChart from "./CustomPieChart";

const ProjectPage = () => {

    const {id} = useParams();
    const [project, setProject] = useState(null);
    const [taskCount, setTaskCount] = useState({});
    const [businessValueCount, setBusinessValueCount] = useState({});
    const [mouseOverAccept, setMouseOverAccept] = useState(false);


    const getProject = async () => {
        let response = await axios.get("http://localhost:8080/project/" + id);
        console.log(response.data);
        response.data.table.statuses.sort(function (a, b) {
            return a.position - b.position;
        });
        response.data.table.statuses.map(status => {
            status.tasks.sort(function (a, b) {
                return a.position - b.position;
            })
        });
        setProject(null);
        setProject(response.data);
        getTaskChartData(response.data.table.statuses);
        getBusinessValueChartData(response.data.table.statuses);

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
                    businessValueCount.start += task.businessValue;
                })
            } else if (status.position === statuses.length) {
                status.tasks.map(task => {
                    businessValueCount.finish += task.businessValue;
                })
            } else {
                status.tasks.map(task => {
                    businessValueCount.inProgress += task.businessValue;
                })
            }
        });
        setBusinessValueCount(businessValueCount);
    };

    const addNewColumn = async (columnName) => {
        let projectId = id;
        let newStatus = {statusName: columnName, projectId: projectId};
        await axios.post("http://localhost:8080/project/newstatus", newStatus);
        getProject();
    };

    const addNewTask = async (taskName, statusId) => {
        let task = {
            statusId: statusId,
            title: taskName
        };
        await axios.post("http://localhost:8080/project/newtask", task);
        getProject();

    };

    useEffect(() => {
        getProject();
    }, []);


    return (

        <div className={"project_item_container_canvas"}>

            {!project ?
                <h1>loading....</h1>
                :
                <div className={"project_item_container"}>
                    <ContentContainer>
                        <div className={"project_title_container"}>
                            <h2>{project.title}</h2>
                        </div>
                        <UsersModal projectId={project.id} participants={project.participants}/>
                        <MailModal projectId={project.id}/>
                    </ContentContainer>
                    <div className={"scrum_table_container"}>
                        <ScrumTable key={project.table.id}
                                    table={project.table}
                                    addNewColumn={addNewColumn}
                                    addNewTask={addNewTask}
                                    setTaskCount={setTaskCount}
                                    tasksDistributionInStatuses={getTaskChartData}
                                    countBusinessValue={getBusinessValueChartData}

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