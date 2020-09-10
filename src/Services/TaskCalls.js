import axios from 'axios'

export default {

    handleDeleteTask : async (taskId) => {
        await axios.delete("https://projecttrackcc.herokuapp.com/task/delete/" + taskId);
    },

    uploadStatusChangeToDatabase : async (newCardPosition) => {
        await axios.put("https://projecttrackcc.herokuapp.com/task/transfer", newCardPosition);
    },

    acceptTask : async(taskId)=> {
        await axios.put("https://projecttrackcc.herokuapp.com/task/finishtask/" + taskId);
    },

    uploadChanges: async (taskId,editedTask)=> {
        let axiosResponse = await axios.put("https://projecttrackcc.herokuapp.com/task/edit/" + taskId, editedTask);
        return axiosResponse.data;
    },
}