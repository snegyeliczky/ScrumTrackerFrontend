import React, {useState} from "react";
import axios from 'axios';

const AddNewProject =()=>{

    const [projectName, setProjectName] = useState("");

    async function addNewProject() {
        console.log(projectName);
        let url =""+projectName;
       // await axios.post(url);

    }

    return(
        <div>
            Create new project:
            <input onChange={(e)=>{setProjectName(e.target.value)}}/>
            <button onClick={addNewProject}>Create Project</button>
        </div>
    )
};
export default AddNewProject;