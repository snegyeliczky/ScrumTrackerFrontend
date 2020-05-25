import React, {useState, useContext, useEffect, useRef} from 'react';
import {useParams} from "react-router";
import axios from "axios";
import Column from "./Column";
import {DragAndDropContext} from "../contexts/DragNDropContext";

const ScrumTable = ({table}) => {

    const [statuses, setStatuses] = useState(table.statuses);

    //dragNDrop

    const [DragItemColumnId,setDragItemColumnId] = useState();
    const dragItem = useRef(); //dragged task id and status id where it come from

    const onDragEnter = (e, newStatusId) => {
        setDragItemColumnId(newStatusId);
        console.log("Drag Item in: ");
        console.log(DragItemColumnId);
    };

    const onDragEnd = () =>{
        console.log("final Status Id: ");
        console.log(DragItemColumnId);
        console.log("drag item: ");
        console.log(dragItem.current);
        refreshStatus(DragItemColumnId,);
    };


    const refreshStatus = (newStatusId) => {
        let newStatuses = table.statuses;
        for (let status of newStatuses) {
            if (status.id === dragItem.current.statusId) {
                let taskArr = [];
                for (let task of status.tasks) {
                    if (task.id === dragItem.current.taskId) {
                        continue;
                    }
                    taskArr.push(task);
                }
                status.tasks = taskArr
            }
            if (newStatusId === status.id) {
                status.tasks.push(dragItem.current.taskObject)
            }

        }
        setStatuses(newStatuses);
        console.log(statuses);
    };

    //

    return (
        <div className={"scrumTable"}>
            {statuses.map(status => {
                return <Column
                    onDragEnd ={onDragEnd}
                    dragItem={dragItem}
                    key={status.id}
                    status={status}
                    onDragEnter={onDragEnter}
                />

            })}
        </div>
    );
};

export default ScrumTable;