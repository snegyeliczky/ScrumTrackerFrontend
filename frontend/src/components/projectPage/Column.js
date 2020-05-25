import React from 'react';
import Task from "./Task";

const Column = ({status, onDragEnter, dragItem,onDragEnd}) => {


    return (
        <div className={"project_culomn"}
             onDragEnter={(e)=>(onDragEnter(status.id))}
        >
            {status.statusName}
            {status.tasks.length === 0 ?
                <h3>no task yet</h3>
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