import React, {useContext, useState} from "react";
import axios from 'axios';
import {useHistory} from "react-router-dom";
import '../customCSS/AuthStyle.css';
import {ProjectContext} from "../contexts/ProjectContext";
import {ContentContainer} from "../styledComps/styled";


const RegistrationPage = () => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const {showErrorAlert,showSuccessAlert} = useContext(ProjectContext);

    const onSubmit = async () => {
        let user = {
            username: username,
            password: password
        };
        try {
            let axiosResponse = await axios.post("http://localhost:8080/auth/registration", user);
            if (axiosResponse.status === 200) {
                showSuccessAlert("registration success please Sign in");
            }
        } catch (e) {
            console.log(e);
            showErrorAlert("Registration failed! This username is in use!");
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
                    <div className="btn_active auth" onClick={onSubmit}>Sign up</div>
                </div>
            </div>
        </div>
    )
};

export default RegistrationPage;

