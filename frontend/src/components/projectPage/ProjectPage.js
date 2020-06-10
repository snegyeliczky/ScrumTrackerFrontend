import React, {useState, useContext, useEffect, useRef} from 'react';
import {useParams} from "react-router";
import axios from "axios";
import ScrumTable from "./ScrumTable";
import {AdderComponent, ContentContainer, Input} from "../styledComps/styled";
import UsersModal from "./UsersModal";
import MailModal from "./MailModal";
import { PieChart } from 'react-minimal-pie-chart';

const ProjectPage = () => {

    const {id} = useParams();
    const [project, setProject] = useState();
    const [taskCount, setTaskCount] = useState();
    const [businessValueCount, setBusinessValueCount] = useState();
    const [loading, setLoading] = useState(true);
    const [mouseOverAccept, setMouseOverAccept] = useState(false);

    //pie chart
    const segmentsStyle = { transition: 'stroke .3s', cursor: 'pointer' };
    const [selectedTaskCount, setSelectedTaskCount] = useState();
    const [selectedBusinessValueCount, setSelectedBusinessValueCount] = useState();


    const getProject = async () => {
        setLoading(true);
        let response = await axios.get("http://localhost:8080/project/" + id);
        response.data.table.statuses.sort(function (a, b) {
            return a.position - b.position;
        });
        response.data.table.statuses.map(status => {
            status.tasks.sort(function (a, b) {
                return a.position - b.position;
            })
        });
        setProject(response.data);
        tasksDistributionInStatuses(response.data.table.statuses);
        countBusinessValue(response.data.table.statuses);
        setLoading(false);
    };

    function tasksDistributionInStatuses(statuses) {
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

    const countBusinessValue = (statuses) => {
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
        //setLoading(true);
        let projectId = id;
        let newStatus = {statusName: columnName, projectId: projectId};
        await axios.post("http://localhost:8080/project/newstatus", newStatus);
        getProject();
    };

    const addNewTask = async (taskName, statusId) => {
        setLoading(true);
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

            {loading ?
                <h1>loading....</h1>
                :
                <div className={"project_item_container"}>
                    <ContentContainer>
                        <div className={"project_title_container"}>
                            <h2>{project.title}</h2>
                        </div>
                            <UsersModal projectId={project.id} participants={project.participants}/>
                            <MailModal projectId={project.id} />
                    </ContentContainer>
                    <div className={"scrum_table_container"}>
                    <ScrumTable key={project.table.id}
                                table={project.table}
                                addNewColumn={addNewColumn}
                                addNewTask={addNewTask}
                                setTaskCount={setTaskCount}
                                tasksDistributionInStatuses={tasksDistributionInStatuses}
                                countBusinessValue={countBusinessValue}

                    />
                    </div>
                    <div className="chart_container">
                    <PieChart
                        className="chart"
                        animate={true}
                        animationDuration={1000}
                        lineWidth={75}
                        radius={40}
                        onClick={(e, segmentIndex) => setSelectedTaskCount(segmentIndex)}
                        segmentsStyle={(index) => {
                            return index === selectedTaskCount
                                ? { ...segmentsStyle, strokeWidth: 40 }
                                : segmentsStyle;
                        }}
                        data={[
                            { title: 'Not Started', value: taskCount.start, color: '#dd2911' },
                            { title: 'In Progress', value: taskCount.inProgress, color: '#efc310' },
                            { title: 'Finished', value: taskCount.finish, color: '#5bc128' },
                        ]}
                    />
                    <PieChart
                        className="chart"
                        animate={true}
                        animationDuration={1000}
                        lineWidth={75}
                        radius={40}
                        onClick={(e, segmentIndex) => setSelectedBusinessValueCount(segmentIndex)}
                        segmentsStyle={(index) => {
                            return index === selectedBusinessValueCount
                                ? { ...segmentsStyle, strokeWidth: 40 }
                                : segmentsStyle;
                        }}
                        data={[
                            { title: 'Not Started', value: businessValueCount.start, color: '#dd2911' },
                            { title: 'In Progress', value: businessValueCount.inProgress, color: '#efc310' },
                            { title: 'Finished', value: businessValueCount.finish, color: '#5bc128' },
                        ]}
                    />
                    </div>
                </div>
            }
        </div>
    );
};

export default ProjectPage;