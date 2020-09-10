import axios from 'axios'

export default {
    getUser: async (username)=>{
       return await axios.get("/user/"+username)
    },

    getSearchUsers: async (userObj) =>{
        let axiosResponse = await axios.post("/user/search", userObj);
        return axiosResponse.data;
    }
}

