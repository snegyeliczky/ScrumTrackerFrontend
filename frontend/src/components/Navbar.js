import React, {useContext} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import "../components/customCSS/NavStyle.css"
import {ProjectContext} from "./contexts/ProjectContext";
import {useHistory} from "react-router-dom";


const Navbar = () => {

    const history = useHistory();
    const {setProjects} = useContext(ProjectContext);

    async function handleLogout() {
        await axios.get("http://localhost:8080/auth/logout");
        setProjects([]);
        localStorage.clear();

        alert("Logout successful");
        history.push("/login");
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
                    <Link className="text-link" onClick={handleLogout}>Logout</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;