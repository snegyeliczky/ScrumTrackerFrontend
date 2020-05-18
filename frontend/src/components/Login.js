import React, {useState} from "react";



const LoginPage = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onChange = (e) => {
        console.log(e);
    };

    const onSubmit = () => {
        console.log(username+password);
    };

    return (
        <div className="loginForm">
            <input onChange={(e)=>setUsername(e.target.value)}/>
            <input onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={onSubmit}>Submit</button>
        </div>
    );
};

export default LoginPage;