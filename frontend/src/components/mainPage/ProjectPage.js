import React, {useState, useContext, useEffect, useRef} from 'react';
import {useParams} from "react-router";
import axios from "axios";
import ScrumTable from "./ScrumTable";


const ProjectPage = () => {

    const {id} = useParams();
    const [project, setProject] = useState();
    const [statuses, setStatuses] = useState();
    const [loading, setLoading] = useState(true);
    const newColumnRef = useRef();

    const getProject = async () => {
        let response = await axios.get("http://localhost:8080/project/" + id);
        setProject(response.data);
        setStatuses(response.data.table.statuses);
        console.log(response.data);
        console.log(response.data.table.statuses);
        setLoading(false);
    };

    const addNewColumn = async (columnName) => {
        if (newColumnRef.current.value === null) {
            alert("add name");
            return;
        }
        setLoading(true);
        columnName = newColumnRef.current.value;
        let projectId = id;
        let newStatus = {statusName: columnName, projectId: projectId};
        await axios.post("http://localhost:8080/project/newstatus", newStatus);
        getProject();
    };

    useEffect(() => {
        getProject();
    }, []);

    return (
        <div>
            {loading ?
                <h1>loading....</h1>
                :
                <div>
                    <button onClick={addNewColumn}> new status</button>
                    <input ref={newColumnRef} />
                    <ScrumTable key={project.table.id} table={project.table}/>
                </div>
            }

        </div>
    );
};

export default ProjectPage;