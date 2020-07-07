import React, {useContext, useRef} from "react";
import {ProjectContext} from '../../Contexts/ProjectContext'
import {AdderComponent,Input} from "../../Assets/StyledComps/styled";
import {
    PlusCircleOutlined,
} from '@ant-design/icons';
import ProjectCalls from "../../Services/ProjectCalls";

const AddNewProject = () => {

    const projectNameRef = useRef();
    const {getProjects} = useContext(ProjectContext);
    const {showErrorAlert} = useContext(ProjectContext);

    async function addNewProject() {
        if (projectNameRef.current.value.length < 3) {
            showErrorAlert("Project title must be minimum 3 character");
            return;
        }
        let projectNameObject = {
            projectName: projectNameRef.current.value
        };
        await ProjectCalls.addNewProject(projectNameObject);
        projectNameRef.current.value = "";
        getProjects();
    }

    return (
        <div className="project_page__create_project_container">
            <AdderComponent>
                <label>Create Project</label>
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