import React, {useState} from "react";
import axios from 'axios';


const LoginPage = () => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const onSubmit = () => {
        let user = {
            username: username,
            password: password
        };
        axios.post("http://localhost:8080/auth/registration", user).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        })
    };

    const onLogin = () => {
        let user = {
            username: username,
            password: password
        };
        axios.post("http://localhost:8080/auth/signin", user).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        })
    };

    return (
        <div>
            <div className="registration">
                <input
                    onChange={(e) => setUsername(e.target.value)}/>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={onSubmit}>Submit</button>
            </div>
            <div className="loginForm">
                <input
                    onChange={(e) => setUsername(e.target.value)}/>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={onLogin}>Submit</button>
            </div>
        </div>
    );
};

export default LoginPage;