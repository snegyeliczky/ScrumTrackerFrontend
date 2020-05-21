import React from 'react';
import Task from "./Task";

const Column = ({status}) => {
    return (
        <div>
            {status.statusName}
            {status.tasks.length === 0 ?
                <h3>no task yet</h3>
                : status.tasks.map(task => {
                return <Task key={task.id} task={task}/>
            })}
        </div>
    );
};

export default Column;