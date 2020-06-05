import React, {useContext, useState} from "react";
import axios from 'axios';
import {useHistory} from "react-router-dom";
import {ProjectContext} from "../contexts/ProjectContext";
import '../customCSS/AuthStyle.css';


const LoginPage = () => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const history = useHistory();
    const {getProjects, projects} = useContext(ProjectContext);

    const onLogin = async () => {
        let user = {
            username: username,
            password: password
        };
        try {
            let axiosResponse = await axios.post("http://localhost:8080/auth/signin", user);
            if (axiosResponse.status === 200) {
                console.log("Login success");
                history.push("/");
            }
        } catch (e) {
            console.log(e);
            alert("Login failed")
        }
    };


    return (
        <div className="login_container">
            <div className="login_form">
                <div className="login_input">
                    <input
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                    />
                </div>
                <div className="login_input">
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="auth_submit_btn">
                    <button className="auth_btn" onClick={onLogin}>Sign in</button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;