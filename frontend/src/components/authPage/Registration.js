import React, {useState} from "react";
import axios from 'axios';
import {useHistory} from "react-router-dom";
import '../customCSS/AuthStyle.css';


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
        <div className="registration_container">
            <div className="registration_form">
                <div className="registration_input">
                <input
                    onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="registration_input">
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button className="auth_btn" onClick={onSubmit}>Registration</button>
            </div>
        </div>
    )
};

export default RegistrationPage;
