import React, {useState, useRef, useContext} from 'react';
import Column from "./Column";
import {DeleteOutlined} from "@ant-design/icons";
import {ContentContainer} from "../styledComps/styled";
import TaskModal from "./TaskModal";


const Task = ({task, statusId, onDragEnd, dragItem, handleDeleteTask}) => {

    const [thisTask, setTask] = useState(task);
    const [dragging, setDragging] = useState(false);

    const handleDrag = (e) => {
        let dragItemParams = {
            statusId: statusId,
            taskObject: task
        };
        dragItem.current = dragItemParams;
        setTimeout(() => {
            setDragging(true);
        }, 0)
    };

    const draggingStyle = (currTaskId) => {
        return currTaskId === dragItem.current.taskObject.id ? "dragged task_card" : "task_card";
    };

    const handleDragEnd = (e) => {
        onDragEnd(task);
        setDragging(false);
        dragItem.current = null;
    };

    return (
        <div className={dragging ? draggingStyle(task.id) : "task_card"}
             draggable={true}
             aria-dropeffect={"none"}
             onDragStart={(event) => (handleDrag(event))}
             onDragEnd={(e) => handleDragEnd(e)}
        >
            <div className={"status_tool_container"}>
                <div><DeleteOutlined onClick={(e) => handleDeleteTask(task.id)}/></div>
                <TaskModal task={thisTask} setTask={setTask}/></div>
            <div className="project_title">{thisTask.title}</div>
            <div className={"businessValue"}>Value: {thisTask.businessValue}</div>
        </div>
    );
};

export default Task;