import React, {useState} from "react";
import axios from 'axios';

const AddNewProject = () => {

    const [projectName, setProjectName] = useState("");

    async function addNewProject() {
        console.log(projectName);
        if (projectName.length < 3) {
            alert("Project name must be minimum 3 character")
        } else {
            let projectNameObject = {projectName: projectName};
            let axiosResponse = await axios.post("http://localhost:8080/project/create", projectNameObject);
            console.log(axiosResponse);
        }
    }

    return (
        <div>
            Create new project:
            <input onChange={(e) => {
                setProjectName(e.target.value)
            }}/>
            <button onClick={addNewProject}>Create Project</button>
        </div>
    )
};
export default AddNewProject;