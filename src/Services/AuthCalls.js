import axios from 'axios'

export default {

    login : async (user)=>{
        let axiosResponse = await axios.post("https://projecttrackcc.herokuapp.com/auth/signin", user);
        return axiosResponse;
    },

    registration : async (user) =>{
        let axiosResponse = await axios.post("https://projecttrackcc.herokuapp.com/auth/registration", user);
        return axiosResponse;
    },

    handleLogout: async () => {
        await axios.get("https://projecttrackcc.herokuapp.com/auth/logout")
    },

}