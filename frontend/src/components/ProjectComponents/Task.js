import React, {useState, useRef, useContext, useEffect} from 'react';
import {DeleteOutlined, ApiOutlined} from "@ant-design/icons";
import {ContentContainer} from "../../Assets/StyledComps/styled";
import TaskModal from "../TaskModal";
import TaskCalls from "../../Services/TaskCalls";

const Task = ({task, statusId, onDragEnd, dragItem, handleDeleteTask, refreshStatusesFromBackend, usersOnProject}) => {

    const [thisTask, setTask] = useState(task);
    const [dragging, setDragging] = useState(false);

    const visualDateFormat = { month: 'long', day: 'numeric'};

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

    async function archiveTask(e) {
        e.stopPropagation();
        await TaskCalls.archiveTask(task.id);
        refreshStatusesFromBackend();
    }

    const deleteTask = () => {
        handleDeleteTask(task.id)
    };

    const backgroundIfMyTask ={
        backgroundColor : localStorage.getItem("username") === task.owner.username ? "rgba(95, 194, 226,0.8)" : ""
    };



    return (
        <div style={backgroundIfMyTask}
            className={dragging ? draggingStyle(task.id) : "task_card"}
            draggable={true}
            aria-dropeffect={"none"}
            onDragStart={(event) => (handleDrag(event))}
            onDragEnd={(e) => handleDragEnd(e)}
        >
            <div className={"status_tool_container"}>
                <div>
                    <DeleteOutlined onClick={deleteTask}/>
                </div>
                <TaskModal
                    task={thisTask}
                    setTask={setTask}
                    refreshStatusesFromBackend={refreshStatusesFromBackend}
                    usersOnProject={usersOnProject}
                />
                <div style={{display: "none"}}>
                    <ApiOutlined onClick={(e) => archiveTask(e)}/>
                </div>
            </div>
            <div className="project_title">{thisTask.title}</div>
            <div className={"businessValue"}>Priority: {thisTask.priority}</div>
            <div className={"businessValue"}>{new Intl.DateTimeFormat('en-US', visualDateFormat).format(new Date(thisTask.deadline))}</div>
        </div>
    );
};

export default Task;