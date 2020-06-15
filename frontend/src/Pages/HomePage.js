import React from 'react';

const HomePage = () => {
    return (
        <div className={"homepage_container"}>
            <div className="homepage">
                <div className={"homepage_data_container"}>
                    <h1>WELCOME {localStorage.getItem("username")} !</h1>
                    <a href={"/projects"}>Let's check your projects !! </a>
                </div>
            </div>
        </div>
    );
};

export default HomePage;