import React, {useState, useContext, useEffect, useRef} from 'react';
import {useParams} from "react-router";
import axios from "axios";
import ScrumTable from "./ScrumTable";
import {AdderComponent, ContentContainer, Input} from "../styledComps/styled";
import {
    PlusCircleOutlined,
    CheckOutlined
} from '@ant-design/icons';
import UsersModal from "./UsersModal";


const ProjectPage = () => {

    const {id} = useParams();
    const [project, setProject] = useState();
    const [statuses, setStatuses] = useState();
    const [loading, setLoading] = useState(true);
    const newColumnRef = useRef();
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
        if (newColumnRef.current.value.length < 3) {
            alert("add name (minimum 3 character) to your status");
            return;
        }
        setLoading(true);
        columnName = newColumnRef.current.value;
        let projectId = id;
        let newStatus = {statusName: columnName, projectId: projectId};
        await axios.post("http://localhost:8080/project/newstatus", newStatus);
        getProject();
    };

    const addNewTask = async (description) => {
        if (newTaskRef.current.value.length < 3) {
            alert("add title (minimum 3 character) to the new task");
            return;
        }
        setLoading(true);
        let projectId = id;
        let task = {
            statusId: project.table.statuses[0].id,
            title: newTaskRef.current.value
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
                    <ScrumTable key={project.table.id} table={project.table}/>
                    <div className={"add_component_container"}>
                        <AdderComponent className={"add_new_status adder_component"}>
                            <label>Add new Status</label>
                            <Input ref={newColumnRef} placeholder={"Status name!"}/>
                            <PlusCircleOutlined style={{fontSize: "35px", padding: "10px", color: "green"}}
                                                onClick={addNewColumn}
                            />
                        </AdderComponent>
                        <AdderComponent className={"add_new_task adder_component"}>
                            <label>Add new Task</label>
                            <Input ref={newTaskRef} placeholder={"Task name!"}/>
                            <PlusCircleOutlined style={{fontSize: "35px", padding: "10px", color: "green"}}
                                                onClick={addNewTask}
                            />
                        </AdderComponent>
                    </div>
                </div>
            }
        </div>
    );
};

export default ProjectPage;