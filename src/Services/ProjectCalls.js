import axios from 'axios';


export default {


    getMyProjects: async () => {
        let response = await axios.get("https://projecttrackcc.herokuapp.com/project/getactiveprojects");
        return response.data;
    },


    getArchiveProjects: async () => {
        let response = await axios.get("https://projecttrackcc.herokuapp.com/project/getarchiveprojects");
        return response.data;
    },


    getParticipatedProjects: async () => {
        let response = await axios.get("https://projecttrackcc.herokuapp.com/project/getparticipateprojects");
        return response.data;
    },

    addNewProject: async (projectNameObject) => {
        await axios.post("https://projecttrackcc.herokuapp.com/project/create", projectNameObject);
    },

    getProject: async (id) => {
        try {
            let response = await axios.get("https://projecttrackcc.herokuapp.com/project/" + id);
            return response.data;
        } catch (e) {

            alert(e.response.data.errors);
            return [];

        }

    },

    addNewColumn : async (newStatus) => {
        await axios.post("https://projecttrackcc.herokuapp.com/project/newstatus", newStatus);
    },

    addNewTask : async (task) => {
        await axios.post("https://projecttrackcc.herokuapp.com/project/newtask", task);
    },

     deleteProject : async (projectId) => {
        await axios.delete("https://projecttrackcc.herokuapp.com/project/delete/" + projectId);
    },

    archiveProject : async (projectId) =>{
        await axios.put("https://projecttrackcc.herokuapp.com/project/archive/"+projectId);
    },

    sendMail : async (projectId,emailCred) =>{
       await axios.post("https://projecttrackcc.herokuapp.com/project/email/"+projectId,emailCred);
    },

    deleteStatus : async (statusID, tableId) => {
        await axios.delete("https://projecttrackcc.herokuapp.com/project/deletestatus?statusid=" + statusID + "&tableid=" + tableId);
    },

    getScrumTable : async (tableId) =>{
        let axiosResponse = await axios.get("https://projecttrackcc.herokuapp.com/project/gettable/" + tableId);
        return axiosResponse.data;
    },

    sendProjectInProgressLimit : async (tableCredentials) =>{
        let axiosResponse = await axios.put("https://projecttrackcc.herokuapp.com/project/table/limit/", tableCredentials);
        return axiosResponse.data;
    },

    addUserToProject : async (projectId,user)=>{
        let respons = await axios.post("https://projecttrackcc.herokuapp.com/project/adduser/" + projectId, user);
        return respons.data;
    },

    saveNewProjectName : async (id, value) => {
        await axios.put("https://projecttrackcc.herokuapp.com/project/rename/"+id+"/"+value)
    }
}