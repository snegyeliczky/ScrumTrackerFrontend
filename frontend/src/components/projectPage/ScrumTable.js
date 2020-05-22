import React, {useState, useContext, useEffect, useRef} from 'react';
import {useParams} from "react-router";
import axios from "axios";
import Column from "./Column";
import Task from "./Task";

const ScrumTable = ({table}) => {

    const dragItem = useRef(); //dragged task id and status id where it come from
    const dragNodeItem = useRef(); // dragged html element

    const [statuses, setStatuses] = useState(table.statuses);


    const onDragEnter = (e,newStatusId)=>{
        let newStatuses = table.statuses;
        for (let status of newStatuses){
            if (status.id === dragItem.current.statusId){
                let taskArr =[];
                for (let task of status.tasks){
                    if (task.id === dragItem.current.taskId){
                        continue;
                    }
                    taskArr.push(task);
                }
                status.tasks = taskArr
            }
            if (newStatusId === status.id){
                status.tasks.push(dragItem.current.taskObject)
            }

        }
        setStatuses(newStatuses);
        console.log(statuses);
    };

    return (
        <div className={"scrumTable"}>
            {statuses.map(status => {
                return <Column dragItem ={dragItem}
                               dragNodeItem = {dragNodeItem}
                               key={status.id}
                               status={status}
                               onDragEnter={onDragEnter}
                />

            })}
        </div>
    );
};

export default ScrumTable;