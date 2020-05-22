import React, {useState, useContext, useEffect, useRef} from 'react';
import {useParams} from "react-router";
import axios from "axios";
import Column from "./Column";
import Task from "./Task";

const ScrumTable = ({table}) => {

    const dragItem = useRef(); //dragged task id and status id where it come from
    const dragNodeItem = useRef(); // dragged html element

    return (
        <div className={"scrumTable"}>
            {table.statuses.map(status => {
                return <Column dragItem ={dragItem}
                               dragNodeItem = {dragNodeItem}
                               key={status.id}
                               status={status} />
            })}
        </div>
    );
};

export default ScrumTable;