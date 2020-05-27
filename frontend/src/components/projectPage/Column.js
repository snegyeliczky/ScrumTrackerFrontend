import React from 'react';
import Task from "./Task";

const Column = ({status, onDragEnter, dragItem, onDragEnd, deleteStatus}) => {

    const handelDeleteClick = () =>{
      deleteStatus(status.id);
    };

    return (
        <div className={"project_column"}
             onDragEnter={(e) => (onDragEnter(status.id))}
        >
            <h3>{status.statusName}</h3>
            <button onClick={handelDeleteClick}>Delete</button>
            {status.tasks.length === 0 ?
                <h4>No task yet</h4>
                : status.tasks.map(task => {
                    return <Task
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