import React from 'react';
import axios from 'axios'

export default {
    getUser: async (username)=>{
       return await axios.get("/user/"+username)

    }
}

