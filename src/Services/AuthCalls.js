import axios from 'axios'

export default {

    login : async (user)=>{
        let axiosResponse = await axios.post("/auth/signin", user);
        return axiosResponse;
    },

    registration : async (user) =>{
        let axiosResponse = await axios.post("/auth/registration", user);
        return axiosResponse;
    },

    handleLogout: async () => {
        await axios.get("/auth/logout")
    },



}