import axios from 'axios'

export default {
    getUser: async (username)=>{
       return await axios.get("https://projecttrackcc.herokuapp.com/user/"+username)
    },

    getSearchUsers: async (userObj) =>{
        let axiosResponse = await axios.post("https://projecttrackcc.herokuapp.com/user/search", userObj);
        return axiosResponse.data;
    }
}

