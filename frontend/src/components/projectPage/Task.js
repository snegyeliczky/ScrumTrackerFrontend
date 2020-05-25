import React, {useState, useRef, useContext} from 'react';
import Column from "./Column";


const Task = ({task, statusId,onDragEnd , dragItem}) => {


    const [dragging, setDragging] = useState(false);

    const handleDrag = (e) => {
        let dragItemParams = {taskId: task.id, statusId: statusId, taskObject:task}
        dragItem.current = dragItemParams;
        setTimeout(()=>{
            setDragging(true);
        },0)
    };

    const draggingStyle = (currTaskId) => {
        if (currTaskId === dragItem.current.taskId) {
            return "dragged task_card"
        }
        return "task_card";
    };

    const handleDragEnd = () =>{
        onDragEnd();
        setDragging(false);
        dragItem.current=null;
    };

    return (
        <div className={dragging ? draggingStyle(task.id) : "task_card"}
             draggable={true}
             onDragStart={(event) => (handleDrag(event))}
             onDragEndCapture={(e)=>(handleDragEnd(e))}
             >
            {task.title}
        </div>
    );
};

export default Task;