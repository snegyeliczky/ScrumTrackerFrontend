import React, {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import {ProjectContext} from "../../Contexts/ProjectContext";
import '../../Assets/Styles/AuthStyle.css';
import AuthCalls from "../../Services/AuthCalls";


const LoginPage = () => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const history = useHistory();
    const {showErrorAlert} = useContext(ProjectContext);

    const onLogin = async () => {
        let user = {
            username: username,
            password: password
        };
        try {
            let axiosResponse = await AuthCalls.login(user);
            if (axiosResponse.status === 200) {
                localStorage.setItem("username",axiosResponse.data.username);
                history.push("/");
            }
        } catch (e) {
            console.log(e);
            showErrorAlert("Login failed! Invalid username or password")
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
                    <div className="btn_active auth" onClick={onLogin}>Sign in</div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;