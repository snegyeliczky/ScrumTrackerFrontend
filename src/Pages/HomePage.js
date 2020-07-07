import React, {useEffect, useState} from 'react';
import {SnippetsOutlined, BookOutlined} from "@ant-design/icons";
import UserCalls from "../Services/UserCalls";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";

const HomePage = () => {

    let [user, setUser] = useState({});

    const getUser = async () => {
        let userObj = await UserCalls.getUser(localStorage.getItem("username"));
        console.log(userObj);
        setUser(userObj.data);
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div className={"homepage_container"}>
            <div className="homepage">
                <div className={"homepage_data_container"}>
                    <h1>WELCOME {localStorage.getItem("username")} !</h1>
                    <a href={"/projects"}>Let's check your projects <BookOutlined/> </a>
                </div>
                <div className={"user_stats"}>
                    <div className={"homepage_stat_container"}>
                        <BookOutlined className={"icon"}/>
                        <p> Created projects by you: </p>
                        <p className={"stat_count"}>{user.projectsCount}</p>
                    </div>
                    <div className={"homepage_stat_container"}>
                        <UserOutlined className={"icon"}/>
                        <p>You Participated in projects:</p>
                        <p className={"stat_count"}>{user.participantCount}</p>
                    </div>
                    <div className={"homepage_stat_container"}>
                        <SnippetsOutlined className={"icon"}/>
                        <p> Tasks in your ownership:</p>
                        <p className={"stat_count"}>{user.tasksCount}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;