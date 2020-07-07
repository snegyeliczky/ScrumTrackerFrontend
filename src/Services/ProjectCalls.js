import axios from 'axios';


export default {


    getMyProjects: async () => {
        let response = await axios.get("project/getactiveprojects");
        return response.data;
    },

    getArchiveProjects: async () => {
        let response = await axios.get("/project/getarchiveprojects");
        return response.data;
    },

    getParticipatedProjects: async () => {
        let response = await axios.get("/project/getparticipateprojects");
        return response.data;
    },

    addNewProject: async (projectNameObject) => {
        await axios.post("/project/create", projectNameObject);
    },

    getProject: async (id) => {
        try {
            let response = await axios.get("/project/" + id);
            return response.data;
        } catch (e) {

            alert(e.response.data.errors);
            return [];

        }

    },

    addNewColumn : async (newStatus) => {
        await axios.post("/project/newstatus", newStatus);
    },

    addNewTask : async (task) => {
        await axios.post("/project/newtask", task);
    },

     deleteProject : async (projectId) => {
        await axios.delete("/project/delete/" + projectId);
    },

    archiveProject : async (projectId) =>{
        await axios.put("/project/archive/"+projectId);
    },

    sendMail : async (projectId,emailCred) =>{
       await axios.post("/project/email/"+projectId,emailCred);
    },

    deleteStatus : async (statusID, tableId) => {
        await axios.delete("/project/deletestatus?statusid=" + statusID + "&tableid=" + tableId);
    },

    getScrumTable : async (tableId) =>{
        let axiosResponse = await axios.get("/project/gettable/" + tableId);
        return axiosResponse.data;
    },

    sendProjectInProgressLimit : async (tableCredentials) =>{
        let axiosResponse = await axios.put("/project/table/limit/", tableCredentials);
        return axiosResponse.data;
    },

    addUserToProject : async (projectId,user)=>{
        let respons = await axios.post("/project/adduser/" + projectId, user);
        return respons.data;
    }
}