import React, {useRef} from 'react';
import Task from "./Task";

const Column = ({status, dragNodeItem, dragItem}) => {


    return (
        <div className={"project_culomn"}>
            {status.statusName}
            {status.tasks.length === 0 ?
                <h3>no task yet</h3>
                : status.tasks.map(task => {
                return <Task dragItem ={dragItem}
                             dragNodeItem = {dragNodeItem}
                             statusId = {status.id}
                             key={task.id}
                             task={task}/>
            })}
        </div>
    );
};

export default Column;