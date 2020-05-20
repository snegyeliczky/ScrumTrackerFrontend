import React, {useState} from "react";
import axios from 'axios';

const AddNewProject = () => {

    const [projectName, setProjectName] = useState("");

    async function addNewProject(e) {
        e.preventDefault();
        console.log(projectName);
        let projectNameObject = {
            projectName: projectName
        };
        let axiosResponse = await axios.post("http://localhost:8080/project/create", projectNameObject);
        console.log(axiosResponse);

    }

    return (
        <div>
            Create new project:
            <form onSubmit={addNewProject}>
            <input
                minLength={3}
                onChange={(e) => {
                setProjectName(e.target.value)
            }}/>
            <input type="submit" value="Create Project" />
            </form>
        </div>
    )
};
export default AddNewProject;