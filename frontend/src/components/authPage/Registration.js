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
            if (axiosResponse.status === 200) {
                console.log("registration ok");
                alert("registration succes please Sign in");
            }
        } catch (e) {
            console.log(e);
            alert("Registration failed");
        }
    };

    return (
        <div className="registration_container">
            <div className="registration_form">
                <div className="registration_input">
                    <input
                        id={"registration_name_input"}
                        onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="registration_input">
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="auth_submit_btn">
                    <button className="auth_btn" onClick={onSubmit}>Sign up</button>
                </div>
            </div>
        </div>
    )
};

export default RegistrationPage;

