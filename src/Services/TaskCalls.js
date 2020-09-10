import axios from 'axios'

export default {

    handleDeleteTask : async (taskId) => {
        await axios.delete("/task/delete/" + taskId);
    },

    uploadStatusChangeToDatabase : async (newCardPosition) => {
        await axios.put("/task/transfer", newCardPosition);
    },

    acceptTask : async(taskId)=> {
        await axios.put("/task/finishtask/" + taskId);
    },

    uploadChanges: async (taskId,editedTask)=> {
        let axiosResponse = await axios.put("/task/edit/" + taskId, editedTask);
        return axiosResponse.data;
    },
}