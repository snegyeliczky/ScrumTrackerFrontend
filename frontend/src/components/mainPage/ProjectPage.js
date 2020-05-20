import React, {useState, useContext, useEffect} from 'react';
import {useParams} from "react-router";
import axios from "axios";

const ProjectPage = () => {

    const {id} = useParams();
    const [project, setProject] = useState();
    const [loading, setLoading] = useState(true);

    const getProjects = async () => {
        let response = await axios.get("http://localhost:8080/project/" + id);
        setProject(response.data);
        setLoading(false);
    };

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <div>
            {loading ?
            <h1>loading....</h1>
            :
            <div>{project.title}</div>
            }
        </div>
    );
};

export default ProjectPage;