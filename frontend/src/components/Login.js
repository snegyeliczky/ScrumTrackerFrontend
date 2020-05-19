import React, {useState} from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom"


const LoginPage = () => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const history = useHistory();


    const onLogin = async () => {
        let user = {
            username: username,
            password: password
        };
        try {
            let axiosResponse = await axios.post("http://localhost:8080/auth/signin", user);
            if (axiosResponse.status===200){
                console.log("Login success");
                history.push("/");
            }
        } catch (e) {
            console.log(e);
            alert("Login failed")
        }
    };

    return (
        <div>

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