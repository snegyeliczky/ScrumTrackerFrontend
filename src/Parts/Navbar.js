import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import "../Assets/Styles/NavStyle.css"
import {ProjectContext} from "../Contexts/ProjectContext";
import {useHistory} from "react-router-dom";
import UnorderedListOutlined from "@ant-design/icons/lib/icons/UnorderedListOutlined";
import AuthCalls from "../Services/AuthCalls";


const Navbar = () => {

    const history = useHistory();
    const {setProjects} = useContext(ProjectContext);
    const {showSuccessAlert} = useContext(ProjectContext);

    async function handleLogout() {
        await AuthCalls.handleLogout();
        setProjects([]);
        localStorage.clear();

        showSuccessAlert("Logout successful");
        history.push("/login");

    }

    return (
        <nav className="main-nav">
            <ul className="nav-items">
                <li className="nav-item nav_menu">
                    <UnorderedListOutlined className="nav_menu"/>
                </li>
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