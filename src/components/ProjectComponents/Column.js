import React, {useState, useRef, useContext} from 'react';
import Task from "./Task";
import {
    DeleteOutlined
} from '@ant-design/icons';
import UseComponentVisible from "../../Utils/UseComponentVisible";
import {ProjectContext} from "../../Contexts/ProjectContext";
import TaskCalls from "../../Services/TaskCalls";
import LikeOutlined from "@ant-design/icons/lib/icons/LikeOutlined";

const Column = ({status, onDragEnter, dragItem, onDragEnd, deleteStatus, refreshStatusesFromBackend,
                    statusFlag, addNewTask, usersOnProject, projectAuthor }) => {

    const newTaskNameRef = useRef();
    const {showErrorAlert} = useContext(ProjectContext);
    const [showAccept,setShowAccept] = useState(true);


    const handleShowAcceptChange =()=>{
        setShowAccept(!showAccept);
        refreshStatusesFromBackend();
    };

    //Click outside effect fields
    const {
        ref,
        isComponentVisible,
        setIsComponentVisible
    } = UseComponentVisible(false);

    const handelDeleteClick = () => {
        deleteStatus(status.id);
    };

    const handleDeleteTask = async (taskId) => {
        console.log("delete");
        await TaskCalls.handleDeleteTask(taskId);
        refreshStatusesFromBackend();
    };

    const handleAddNewTask = () => {
        console.log(newTaskNameRef.current.value);
        if (newTaskNameRef.current.value.length < 3) {
            showErrorAlert("Please enter minimum 3 characters!");
            newTaskNameRef.current.value = "";
            return;
        }
        let taskName = newTaskNameRef.current.value;
        addNewTask(taskName, status.id);
        newTaskNameRef.current.value = "";
    };

    const showAcceptStyle={
        color: showAccept?"green":"",
    };

    return (
        <div className={"project_column"}
             onDragEnter={(e) => (onDragEnter(status.id))}
        >
            <div>
                <div className={"status_tool_container"}>
                    <DeleteOutlined onClick={handelDeleteClick}/>
                    {statusFlag==="finish"? <LikeOutlined style={showAcceptStyle} onClick={handleShowAcceptChange}/>:""}
                </div>
                <h3>{status.statusName} </h3>
            </div>
            {status.tasks.length === 0 ?
                <h4>No task yet</h4>
                : status.tasks.map(task => {
                   return  showAccept ?
                    <Task
                        refreshStatusesFromBackend={refreshStatusesFromBackend}
                        handleDeleteTask={handleDeleteTask}
                        onDragEnd={onDragEnd}
                        dragItem={dragItem}
                        statusId={status.id}
                        key={task.id}
                        task={task}
                        onDragEnter={onDragEnter}
                        usersOnProject={usersOnProject}
                        projectAuthor = {projectAuthor}
                        statusFlag ={statusFlag}
                    />
                    : task.finished? ""
                           :<Task
                               refreshStatusesFromBackend={refreshStatusesFromBackend}
                               handleDeleteTask={handleDeleteTask}
                               onDragEnd={onDragEnd}
                               dragItem={dragItem}
                               statusId={status.id}
                               key={task.id}
                               task={task}
                               onDragEnter={onDragEnter}
                               usersOnProject={usersOnProject}
                               projectAuthor = {projectAuthor}
                               statusFlag ={statusFlag}
                           />;

                })}
            <div ref={ref}>
                {isComponentVisible && (
                    <div className="add_new_task_container">
                        <input className="add_new_task_text" ref={newTaskNameRef}/>
                        <div className="add_new_task_btn" onClick={handleAddNewTask}>save</div>
                    </div>
                )}
                {!isComponentVisible && (
                    <div className="add_new_task" onClick={() => setIsComponentVisible(true)}>
                        add new task
                    </div>
                )}
            </div>
        </div>
    );
};

export default Column;