import React, {useContext, useState} from "react";
import axios from 'axios';
import {useHistory} from "react-router-dom";
import '../customCSS/AuthStyle.css';
import {ProjectContext} from "../contexts/ProjectContext";
import {ContentContainer} from "../styledComps/styled";


const RegistrationPage = ({handleLogin}) => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);

    const {showErrorAlert, showSuccessAlert} = useContext(ProjectContext);

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const onSubmit = async () => {
        let user = {
            username: username,
            password: password,
            email:email
        };
        try {
            if (username===null||password===null||email===null) throw new ReferenceError("empty fields");
            else if (!validateEmail(email)) throw new TypeError("invalid e-mail");
            let axiosResponse = await axios.post("http://localhost:8080/auth/registration", user);
            if (axiosResponse.status === 200) {
                showSuccessAlert("registration success please Sign in");
                handleLogin();
            }
        } catch (e) {
            console.log(e);
            if (e instanceof TypeError) showErrorAlert("Invalid E-mail adresse please use example@example.com form");
            else if (e instanceof ReferenceError) showErrorAlert("Username, password and email fields are required! ");
            else showErrorAlert("Registration failed! This username is in use!");
        }
    };


    return (
        <div className="registration_container">
            <div className="registration_form">
                <div className="registration_input">
                    <input
                        placeholder={"username"}
                        id={"registration_name_input"}
                        onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="registration_input">
                    <input
                        placeholder={"password"}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="registration_input">
                    <input
                        placeholder={"e-mail"}
                        onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="auth_submit_btn">
                    <div className="btn_active auth" onClick={onSubmit}>Sign up</div>
                </div>
            </div>
        </div>
    )
};

export default RegistrationPage;

