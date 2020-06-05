import React, {useState, useContext, useEffect, useRef} from 'react';
import {useParams} from "react-router";
import axios from "axios";
import ScrumTable from "./ScrumTable";
import {AdderComponent, ContentContainer, Input} from "../styledComps/styled";
import {
    PlusCircleOutlined,
    CheckOutlined,
    FolderAddOutlined,
    UsergroupAddOutlined,
    PlusOutlined
} from '@ant-design/icons';
import UsersModal from "./UsersModal";


const ProjectPage = () => {

    const {id} = useParams();
    const [project, setProject] = useState();
    const [statuses, setStatuses] = useState();
    const [loading, setLoading] = useState(true);
    const newTaskRef = useRef();
    const [mouseOverAccept, setMouseOverAccept] = useState(false);

    const getProject = async () => {
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
        console.log(response.data);
        setLoading(false);
    };

    const addNewColumn = async (columnName) => {
        setLoading(true);
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
                        <h2>{project.title}</h2>
                        <UsersModal projectId={project.id} participants={project.participants}/>
                    </ContentContainer>
                    <ScrumTable key={project.table.id}
                                table={project.table}
                                addNewColumn={addNewColumn}
                                addNewTask={addNewTask}
                    />
                </div>
            }
        </div>
    );
};

export default ProjectPage;