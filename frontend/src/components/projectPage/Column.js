import React, {useState, useRef} from 'react';
import Task from "./Task";
import {
    DeleteOutlined
} from '@ant-design/icons';
import axios from "axios";

const Column = ({status, onDragEnter, dragItem, onDragEnd, deleteStatus, refreshStatusesFromBackend, statusFlag, addNewTask}) => {

    const newTaskNameRef = useRef();
    const [activeAddNewTask, setActiveNewTask] = useState(false);

    const handelDeleteClick = () => {
        deleteStatus(status.id);
    };

    const handleDeleteTask = async (taskId) => {
        console.log("delete");
        await axios.delete("http://localhost:8080/task/delete/" + taskId);
        refreshStatusesFromBackend();
    };

    const handleAddNewTask = () => {
        console.log(newTaskNameRef.current.value);
        if (newTaskNameRef.current.value.length < 3) {
            alert("please minimum 3 character!");
            newTaskNameRef.current.value = "";
            return;
        }
        let taskName = newTaskNameRef.current.value;
        addNewTask(taskName, status.id);
        newTaskNameRef.current.value = "";
        setNewTask();
    };

    const addNewTaskStyle = () => {
      return !activeAddNewTask ? "add_new_task_active" : "add_new_task_inactive";
    };

    const setNewTask = () => {
      setActiveNewTask(!activeAddNewTask);
    };

    return (
        <div className={"project_column"}
             onDragEnter={(e) => (onDragEnter(status.id))}
        >
            <div>
                <div className={"status_tool_container"}>
                    <DeleteOutlined onClick={handelDeleteClick}/>
                </div>
                <h3>{status.statusName} </h3>
            </div>
            {status.tasks.length === 0 ?
                <h4>No task yet</h4>
                : status.tasks.map(task => {
                    return <Task
                        refreshStatusesFromBackend={refreshStatusesFromBackend}
                        handleDeleteTask={handleDeleteTask}
                        onDragEnd={onDragEnd}
                        dragItem={dragItem}
                        statusId={status.id}
                        key={task.id}
                        task={task}
                        onDragEnter={onDragEnter}
                    />
                })}
            <div className="add_new_task_container">
                <div className={addNewTaskStyle()}
                     onClick={setNewTask}>
                    add new task
                </div>
                <input className="add_new_task_text" ref={newTaskNameRef}/>
                <div className="add_new_task_btn" onClick={handleAddNewTask}>save</div>
            </div>
        </div>
    );
};

export default Column;