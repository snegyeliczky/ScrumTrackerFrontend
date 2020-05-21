import React, {useState, useContext, useEffect} from 'react';
import {useParams} from "react-router";
import axios from "axios";


const ProjectPage = () => {

    const {id} = useParams();
    const [project, setProject] = useState();
    const [statuses, setStatuses] = useState();
    const [loading, setLoading] = useState(true);

    const getProject = async () => {
        let response = await axios.get("http://localhost:8080/project/" + id);
        setProject(response.data);
        setStatuses(response.data.table.statuses);
        console.log(response.data);
        console.log(response.data.table.statuses);
        setLoading(false);
    };

    const addNewColumn = async (columnName) => {
        setLoading(true);
        columnName = "hello";
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
                <div className={"projectContainer"}>
                    <h1>{project.title}</h1>
                    <div className={"statusContainer"}>
                        {statuses.map(projectStatus => (

                            <div>
                                <div>{projectStatus.statusName}</div>
                                {projectStatus.tasks.length == 0 ? "no project yet"
                                    : projectStatus.tasks.map(task => (
                                        <div>{task.author}</div>
                                    ))}
                            </div>
                        ))}
                    </div>
                </div>
            }
            <div>
                <button onClick={addNewColumn}> new status</button>
            </div>
        </div>
    );
};

export default ProjectPage;