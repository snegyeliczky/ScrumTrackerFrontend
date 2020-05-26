import React, {useState, useRef, useContext} from 'react';
import Column from "./Column";


const Task = ({task, statusId,onDragEnd , dragItem}) => {


    const [dragging, setDragging] = useState(false);

    const handleDrag = (e) => {
        let dragItemParams = {
            statusId: statusId,
            taskObject:task
        };
        dragItem.current = dragItemParams;
        setTimeout(()=>{
            setDragging(true);
        },0)
    };

    const draggingStyle = (currTaskId) => {
        return currTaskId === dragItem.current.taskObject.id ? "dragged task_card" : "task_card";
    };

    const handleDragEnd = () =>{
        onDragEnd(task);
        setDragging(false);
        dragItem.current=null;
    };

    return (
        <div className={dragging ? draggingStyle(task.id) : "task_card"}
             draggable={true}
             onDragStart={(event) => (handleDrag(event))}
             onDragEnd={handleDragEnd}
             >
            {task.title}
        </div>
    );
};

export default Task;