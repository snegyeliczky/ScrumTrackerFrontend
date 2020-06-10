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
    const [statuses, setStatuses] = useState();
    const [loading, setLoading] = useState(true);
    const [mouseOverAccept, setMouseOverAccept] = useState(false);

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
        setLoading(false);
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
                    />
                    </div>
                    <div className="chart_container">
                    <PieChart
                        data={[
                            { title: 'One', value: 10, color: '#E38627' },
                            { title: 'Two', value: 15, color: '#C13C37' },
                            { title: 'Three', value: 20, color: '#6A2135' },
                        ]}
                    />;
                    </div>
                </div>
            }
        </div>
    );
};

export default ProjectPage;