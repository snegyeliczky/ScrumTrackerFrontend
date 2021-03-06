import React, {useState} from 'react';
import {DeleteOutlined, AlertTwoTone, SmileTwoTone,LikeOutlined} from "@ant-design/icons";

import TaskModal from "../TaskModal";
import TaskCalls from "../../Services/TaskCalls";

const Task = ({
                  task, statusId, onDragEnd, dragItem, handleDeleteTask, refreshStatusesFromBackend,
                  usersOnProject, statusFlag, projectAuthor
              }) => {

    const [thisTask, setTask] = useState(task);
    const [dragging, setDragging] = useState(false);

    const visualDateFormat = {month: 'long', day: 'numeric'};



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

    async function acceptTask(e) {
        e.stopPropagation();
        await TaskCalls.acceptTask(task.id);
        refreshStatusesFromBackend();
    }

    const deleteTask = () => {
        handleDeleteTask(task.id)
    };

    const backgroundIfMyTask = {
        backgroundColor: localStorage.getItem("username") === (task.owner?.username ?? "") ? "rgba(95, 194, 226,0.8)" : ""
    };

    function alertColor() {
        let number = new Date(task.deadline) - new Date();
        if (number < 40000000) {
            return "red";
        } else if (number < 100000000) {
            return "Orange";
        } else {
            return "";
        }

    };

    const showAcceptStyle={
        color: task.finished?"green":"",
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
                {
                    (projectAuthor === localStorage.getItem("username") && statusFlag === "finish") ?
                        <div>
                            <LikeOutlined style={showAcceptStyle} onClick={(e) => acceptTask(e)}/>
                        </div>
                        :
                        ''

                }
            </div>
            <div className="project_title">{thisTask.title}</div>
            <div className={"task_data_container"}>
                <div className={"owner"}>{thisTask.owner ? <SmileTwoTone/> : ''}</div>
                <div className={"businessValue"}>{thisTask.priority > 0 ? "Pri.: " + thisTask.priority : ''}</div>
                <div className={"deadline"}>
                    {thisTask.deadline ? new Intl.DateTimeFormat('en-US', visualDateFormat).format(new Date(thisTask.deadline)) : ""}
                    {" "}
                    {thisTask.deadline ? <AlertTwoTone twoToneColor={alertColor()}/> : ''}
                </div>
            </div>
        </div>
    );
};

export default Task;