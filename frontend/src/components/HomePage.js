import React from 'react';

const HomePage = () => {
    return (
        <div className="homepage">
            <h1>WELCOME  {localStorage.getItem("username")} !</h1>
            <a href={"/projects"}>Let's check your projects !! </a>
        </div>
    );
};

export default HomePage;