import React, {useContext} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import "../components/customCSS/NavStyle.css"
import {ProjectContext} from "./contexts/ProjectContext";


const Navbar = () => {

    const {setProjects} = useContext(ProjectContext);

    async function handleLogout() {
        await axios.get("http://localhost:8080/auth/logout");
        setProjects([]);
        alert("Logout successful");
    }

    return (
        <nav className="main-nav">
            <ul className="nav-items">
                <li className="nav-item">
                    <Link className='text-link' to="/"> Home</Link>
                </li>
                <li className="nav-item">
                    <Link className='text-link' to="/projects"> Projects</Link>
                </li>
                <li className="nav-item">
                    <Link to="/registration" className='text-link'>Registration</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="text-link">Login</Link>
                </li>
                <li className="nav-item">
                    <div className="text-link" onClick={handleLogout}>Logout</div>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;