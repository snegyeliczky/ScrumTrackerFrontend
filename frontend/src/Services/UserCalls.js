import React from 'react';
import axios from 'axios'

export default {
    getUser: async (username)=>{
       return await axios.get("http://localhost:8080/user/"+username)

    }
}

