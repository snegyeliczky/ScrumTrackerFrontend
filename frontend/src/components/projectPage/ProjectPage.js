import React, {useState, useContext, useEffect, useRef} from 'react';
import {useParams} from "react-router";
import axios from "axios";
import ScrumTable from "./ScrumTable";
import {AdderComponent} from "../styledComps/styled";
import {
    PlusCircleOutlined

} from '@ant-design/icons';


const ProjectPage = () => {

    const {id} = useParams();
    const [project, setProject] = useState();
    const [statuses, setStatuses] = useState();
    const [loading, setLoading] = useState(true);
    const newColumnRef = useRef();
    const newTaskRef = useRef();

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
                    <div className={"add_component_container"}>
                        <AdderComponent className={"add_new_status adder_component"}>
                            <button onClick={addNewColumn}> new status</button>
                            <input ref={newColumnRef}/>
                        </AdderComponent>
                        <AdderComponent className={"add_new_task adder_component"}>
                            <label>Add new Task</label>
                            <input ref={newTaskRef}/>
                            <PlusCircleOutlined style={{fontSize: "35px", padding: "10px", color:"green"}}
                                                onClick={addNewTask}/>
                        </AdderComponent>
                    </div>

                    <ScrumTable key={project.table.id} table={project.table}/>
                </div>
            }
        </div>
    );
};

export default ProjectPage;