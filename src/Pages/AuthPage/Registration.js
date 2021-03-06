import React, {useContext, useState} from "react";
import '../../Assets/Styles/AuthStyle.css';
import {ProjectContext} from "../../Contexts/ProjectContext";
import AuthCalls from "../../Services/AuthCalls";

const RegistrationPage = ({handleLogin}) => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);

    const {showErrorAlert, showSuccessAlert} = useContext(ProjectContext);

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function validateInput(username) {
        const re = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/
        return re.test(String(username).toLowerCase());
    }

    const onSubmit = async () => {
        let user = {
            username: username,
            password: password,
            email:email
        };
        if (username.length < 5 || password.length < 5) {
            showErrorAlert("Please use at least five character to your username/password");
            return;
        }
        try {
            if (username===null||password===null||email===null) throw new ReferenceError("empty fields");
            else if (!validateEmail(email)) throw new TypeError("invalid e-mail");
            else if (!validateInput(username)) throw new RangeError("invalid username/password");
            else if (!validateInput(password)) throw new RangeError("invalid username/password");
            let axiosResponse = await AuthCalls.registration(user);
            if (axiosResponse.status === 200) {
                showSuccessAlert("registration success please Sign in");
                handleLogin();
            }
        } catch (e) {
            console.log(e);
            if (e instanceof TypeError) showErrorAlert("Invalid E-mail adresse please use example@example.com form");
            else if (e instanceof ReferenceError) showErrorAlert("Username, password and email fields are required! ");
            else if (e instanceof RangeError) showErrorAlert("Wrong username or password, try again!");
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

