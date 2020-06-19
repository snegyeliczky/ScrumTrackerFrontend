import React, {useState, useContext, useEffect, useRef} from 'react';
import Column from "./Column";
import axios from "axios";
import {ContentContainer} from "../../Assets/StyledComps/styled"
import {PlusOutlined} from "@ant-design/icons";
import UseComponentVisible from "../../Utils/UseComponentVisible";
import ProjectCalls from "../../Services/ProjectCalls";
import TaskCalls from "../../Services/TaskCalls";

const ScrumTable = ({table, addNewColumn, addNewTask, countBusinessValue,
                        usersOnProject, tasksDistributionInStatuses,refreshScrumTableBackend}) => {

    const newColumnRef = useRef();
    const [DragItemColumnId, setDragItemColumnId] = useState();
    const dragItem = useRef(); //dragged task id and status id where it come from



    //Click outside effect fields
    const {
        ref,
        isComponentVisible,
        setIsComponentVisible
    } = UseComponentVisible(false);


    const deleteStatus = async (statusID) => {
        await ProjectCalls.deleteStatus(statusID,table.id);
        refreshScrumTableBackend();
    };


    const uploadStatusChangeToDatabase = async () => {
        let refreshItem = {
            toStatusId: DragItemColumnId,
            fromStatusId: dragItem.current.statusId,
            taskId: dragItem.current.taskObject.id
        };
        await TaskCalls.uploadStatusChangeToDatabase(refreshItem);
    };


    const onDragEnter = (newStatusId) => {
        setDragItemColumnId(newStatusId);
    };

    const onDragEnd = async () => {
        table.statuses=refreshStatus(DragItemColumnId);
        await uploadStatusChangeToDatabase();
    };


    const refreshStatus = (newStatusId) => {
        let newStatuses = [...table.statuses];
        for (let status of newStatuses) {
            if (status.id === dragItem.current.statusId) {
                let taskArr = [...status.tasks];
                let index = taskArr.indexOf(dragItem.current.taskObject);
                if (index > -1) {
                    taskArr.splice(index, 1)
                }
                status.tasks = taskArr
            }
            if (newStatusId === status.id) {
                status.tasks.push(dragItem.current.taskObject)
            }
        }
        tasksDistributionInStatuses(newStatuses);
        countBusinessValue(newStatuses);
        return newStatuses;
    };

    const handleSaveNewColumn = () => {
        if (newColumnRef.current.value.length < 3) {
            alert("add name (minimum 3 character) to your status");
            return;
        }
        addNewColumn(newColumnRef.current.value);
        newColumnRef.current.value = "";

    };

    return (
        <div className={"scrum_table"}
                          onDragOver={(e) => e.preventDefault()}>
            {
                table.statuses.map((status, i) => {
                    let statusFlag = null;

                    if (i === 0) {
                        statusFlag = "start";
                    }
                    if (i === table.statuses.length - 1) {
                        statusFlag = "finish";
                    }

                    return <Column
                        statusFlag={statusFlag}
                        deleteStatus={deleteStatus}
                        onDragEnd={onDragEnd}
                        dragItem={dragItem}
                        key={status.id}
                        status={status}
                        onDragEnter={onDragEnter}
                        refreshStatusesFromBackend={refreshScrumTableBackend}
                        addNewTask={addNewTask}
                        usersOnProject={usersOnProject}
                    />

                })
            }

            <div>
                {isComponentVisible && (
                    <div ref={ref} className="add_new_column_container">
                        <input className="add_new_column_text" ref={newColumnRef}/>
                        <div className="add_new_column_btn" onClick={handleSaveNewColumn}>save</div>
                    </div>
                )}
                {!isComponentVisible && (
                    <div onClick={() => setIsComponentVisible(true)}>
                        <PlusOutlined id={"add_status_icon"}/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScrumTable;