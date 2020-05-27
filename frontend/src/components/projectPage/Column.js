import React from 'react';
import Task from "./Task";

const Column = ({status, onDragEnter, dragItem,onDragEnd}) => {


    return (
        <div className={"project_column"}
             onDragEnter={(e)=>(onDragEnter(status.id))}
        >
            <label>{status.statusName}</label>
            {status.tasks.length === 0 ?
                <h3>No task yet</h3>
                : status.tasks.map(task => {
                    return <Task
                        onDragEnd ={onDragEnd}
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