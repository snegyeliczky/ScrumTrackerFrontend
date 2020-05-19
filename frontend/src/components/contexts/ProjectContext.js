import React, {useState, createContext} from "react";
import axios from "axios";

export const ProjectContext = createContext();

export const ProjectProvider = props =>{

    const hello =()=>{
        console.log("hello context");
    };

    return(
        <ProjectContext.Provider
        value={{hello
        }}>
            {props.children}
        </ProjectContext.Provider>
    )

};