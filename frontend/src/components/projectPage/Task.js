import React, {useState, useRef} from 'react';

const Task = ({task, statusId, dragItem, dragNodeItem }) => {


    const [dragging, setDragging] = useState(false);

    const handleDrag = (e) => {
        let dragItemParams = {taskId: task.id, statusId: statusId}
        dragItem.current = dragItemParams;
        dragNodeItem.current=e.target;
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
        setDragging(false)
        dragItem.current=null;
        dragNodeItem.current=null;
    };

    const onDragEnter = (e,statusId)=>{
        console.log(dragNodeItem.current);
        console.log(e.target)
    };


    return (
        <div className={dragging ? draggingStyle(task.id) : "task_card"}
             draggable={true}
             onDragStart={(event) => (handleDrag(event))}
             onDragEnd={(e)=>(handleDragEnd(e))}
             onDragEnter={(e)=>(onDragEnter(e,statusId))}>
            {task.title}
        </div>
    );
};

export default Task;