import React, {useState} from 'react';
import Task from "./Task";
import {
    DeleteOutlined
} from '@ant-design/icons';
import axios from "axios";

const Column = ({status, onDragEnter, dragItem, onDragEnd, deleteStatus, refreshStatusesFromBackend}) => {

    const handelDeleteClick = () => {
        deleteStatus(status.id);
    };



    const handleDeleteTask = async (taskId) =>{
        console.log("delete");
        await axios.delete("http://localhost:8080/task/delete/"+taskId);
        refreshStatusesFromBackend();
    };

    return (
        <div className={"project_column"}
             onDragEnter={(e) => (onDragEnter(status.id))}
        >
            <div><div className={"status_tool_container"}><DeleteOutlined onClick={handelDeleteClick}/></div><h3>{status.statusName} </h3></div>
            {status.tasks.length === 0 ?
                <h4>No task yet</h4>
                : status.tasks.map(task => {
                    return <Task
                        handleDeleteTask={handleDeleteTask}
                        onDragEnd={onDragEnd}
                        dragItem={dragItem}
                        statusId={status.id}
                        key={task.id}
                        task={task}
                        onDragEnter={onDragEnter}
                    />
                })}
        </div>
    );
};

export default Column;