import React, {useContext, useRef} from "react";
import axios from 'axios';
import {ProjectContext} from '../contexts/ProjectContext'
import {AdderComponent,Input} from "../styledComps/styled";
import {
    PlusCircleOutlined,
} from '@ant-design/icons';

const AddNewProject = () => {

    const projectNameRef = useRef();
    const {getProjects} = useContext(ProjectContext);

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
        getProjects();
    }

    return (
        <div className="project_page__create_project_container">
            <AdderComponent>
                <label>Crate Project</label>
                <Input
                    placeholder={"Project Name"}
                    ref={projectNameRef}
                />
                <PlusCircleOutlined
                    style={{fontSize: "35px", padding: "10px", color: "green"}}
                    onClick={addNewProject}
                />
            </AdderComponent>
        </div>
    )
};
export default AddNewProject;