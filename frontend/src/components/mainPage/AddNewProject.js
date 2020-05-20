import React, { useRef } from "react";
import axios from 'axios';

const AddNewProject = () => {

    const projectNameRef = useRef();

    async function addNewProject() {
        if (projectNameRef.current.value.length < 3) {
            alert("minimum 3 character");
            return;
        }
        console.log(projectNameRef.current.value);
        let projectNameObject = {
            projectName: projectNameRef.current.value
        };
        let axiosResponse = await axios.post("http://localhost:8080/project/create", projectNameObject);
        console.log(axiosResponse);
        projectNameRef.current.value = "";

    }

    return (
        <div>
            Create new project:
            <div>
                <input
                    minLength={3}
                    ref={projectNameRef}
                />
                <input
                    type="submit"
                    onClick={addNewProject}
                    value="Create Project"
                />
            </div>
        </div>
    )
};
export default AddNewProject;