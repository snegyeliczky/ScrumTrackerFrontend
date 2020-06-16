import React from 'react';
import axios from 'axios'

export default {

    handleDeleteTask : async (taskId) => {
        await axios.delete("http://localhost:8080/task/delete/" + taskId);
    },

    uploadStatusChangeToDatabase : async (newCardPosition) => {
        await axios.put("http://localhost:8080/task/transfer", newCardPosition);
    },

    archiveTask : async(taskId)=> {
        await axios.put("http://localhost:8080/task/archive/" + taskId);
    },

    uploadChanges: async (taskId,editedTask)=> {
        let axiosResponse = await axios.put("http://localhost:8080/task/edit/" + taskId, editedTask);
        return axiosResponse.data;
    },
}