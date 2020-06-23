import React, {useEffect, useState} from 'react';
import {SnippetsOutlined} from "@ant-design/icons";
import UserCalls from "../Services/UserCalls";
import {use} from "@js-joda/core";

const HomePage = () => {

    let [user,setUser] = useState({});

    const getUser=async ()=>{
      let userObj = await UserCalls.getUser(localStorage.getItem("username"));
      console.log(userObj);
      setUser(userObj.data);
    };

    useEffect(()=>{
        getUser();
    },[]);

    return (
        <div className={"homepage_container"}>
            <div className="homepage">
                <div className={"homepage_data_container"}>
                    <h1>WELCOME {localStorage.getItem("username")} !</h1>
                    <p> Total projects <SnippetsOutlined /> :  {user.projectsCount} </p>
                    <p> Participated <SnippetsOutlined /> :  {user.participantCount} </p>
                    <a href={"/projects"}>Let's check your projects <SnippetsOutlined /> </a>
                </div>
            </div>
        </div>
    );
};

export default HomePage;