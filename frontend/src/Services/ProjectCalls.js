import React from 'react';
import axios from 'axios';


export default {


    getMyProjects: async () => {
        let response = await axios.get("http://localhost:8080/project/getactiveprojects");
        return response.data;
    },

    getArchiveProjects: async () => {
        let response = await axios.get("http://localhost:8080/project/getarchiveprojects");
        return response.data;
    },

    getParticipatedProjects: async () => {
        let response = await axios.get("http://localhost:8080/project/getparticipateprojects");
        return response.data;
    },

    addNewProject: async (projectNameObject) => {
        await axios.post("http://localhost:8080/project/create", projectNameObject);
    },

    getProject: async (id) => {
        try {
            let response = await axios.get("http://localhost:8080/project/" + id);
            return response.data;
        } catch (e) {

            alert(e.response.data.errors);
            return [];

        }

    },

    addNewColumn : async (newStatus) => {
        await axios.post("http://localhost:8080/project/newstatus", newStatus);
    },

    addNewTask : async (task) => {
        await axios.post("http://localhost:8080/project/newtask", task);
    },

     deleteProject : async (projectId) => {
        await axios.delete("http://localhost:8080/project/delete/" + projectId);
    },

    archiveProject : async (projectId) =>{
        await axios.put("http://localhost:8080/project/archive/"+projectId);
    },

    sendMail : async (projectId,emailCred) =>{
       await axios.post("http://localhost:8080/project/email/"+projectId,emailCred);
    },

    deleteStatus : async (statusID, tableId) => {
        await axios.delete("http://localhost:8080/project/deletestatus?statusid=" + statusID + "&tableid=" + tableId);
    },

    getScrumTable : async (tableId) =>{
        let axiosResponse = await axios.get("http://localhost:8080/project/gettable/" + tableId);
        return axiosResponse.data;
    }



}