import React, {useState} from "react";
import axios from 'axios';
import {useHistory} from "react-router-dom";

const RegistrationPage = () => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const history = useHistory();

    const onSubmit = async () => {
        let user = {
            username: username,
            password: password
        };
        try {
            let axiosResponse = await axios.post("http://localhost:8080/auth/registration", user);
            if (axiosResponse.status ===200) {
                console.log("registration ok");
                alert("registration succes");
                history.push("/");
            }
        } catch(e){
            console.log(e);
            alert("Registration failed");
        }
    };

    return(
        <div>
            <div className="registration">
                <input
                    onChange={(e) => setUsername(e.target.value)}/>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={onSubmit}>Submit</button>
            </div>
        </div>
    )
};

export default RegistrationPage;

