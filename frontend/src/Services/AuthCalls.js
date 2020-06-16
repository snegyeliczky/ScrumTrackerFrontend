import React from 'react';
import axios from 'axios'

export default {

    login : async (user)=>{
        let axiosResponse = await axios.post("http://localhost:8080/auth/signin", user);
        return axiosResponse;
    },

    registration : async (user) =>{
        let axiosResponse = await axios.post("http://localhost:8080/auth/registration", user);
        return axiosResponse;
    },

    handleLogout: async () => {
        await axios.get("http://localhost:8080/auth/logout")
    },

}