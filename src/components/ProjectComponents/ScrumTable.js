import React, {useState, useContext, useRef, useEffect} from 'react';
import Column from "./Column";
import {PlusOutlined} from "@ant-design/icons";
import UseComponentVisible from "../../Utils/UseComponentVisible";
import ProjectCalls from "../../Services/ProjectCalls";
import TaskCalls from "../../Services/TaskCalls";
import {ProjectContext} from "../../Contexts/ProjectContext";
import TaskDistibution from "./taskDistibution";

const ScrumTable = ({
                        table, addNewColumn, addNewTask, countBusinessValue,
                        usersOnProject, tasksDistributionInStatuses,
                        projectAuthor
                    }) => {

    const {showErrorAlert} = useContext(ProjectContext);
    const [statuses, setStatuses] = useState(table.statuses);
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
        await ProjectCalls.deleteStatus(statusID, table.id);
        refreshStatusesFromBackend();
    };

    const refreshStatusesFromBackend = async () => {
        let ScrumTable = await ProjectCalls.getScrumTable(table.id);
        ScrumTable.statuses.sort(function (a, b) {
            return a.position - b.position;
        });
        ScrumTable.statuses.map(status =>{
            status.tasks.sort(function (a,b) {
                return a.position - b.position;
            });
        });
        tasksDistributionInStatuses(ScrumTable.statuses);
        countBusinessValue(ScrumTable.statuses);
        setStatuses(ScrumTable.statuses);
    };

    const uploadStatusChangeToDatabase = async () => {
        let prevColumn = dragItem.current.statusId;
        let refreshItem = {
            toStatusId: DragItemColumnId,
            fromStatusId: dragItem.current.statusId,
            taskId: dragItem.current.taskObject.id
        };
        try {
            await TaskCalls.uploadStatusChangeToDatabase(refreshItem);
        } catch (e) {
            showErrorAlert(e.response.data.errors);
            //alert(e.response.data.errors);
            refreshStatusesFromBackend();
            console.log(prevColumn);

        }
    };


    const onDragEnter = (newStatusId) => {
        setDragItemColumnId(newStatusId);
    };

    const onDragEnd = async () => {
        setStatuses(refreshStatus(DragItemColumnId));
        await uploadStatusChangeToDatabase();
    };


    const refreshStatus = (newStatusId) => {
        let newStatuses = [...statuses];
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

    function getUsersWithTasks(statuses) {
        let usersWithTasks = {};
        statuses.map( (status)=>{
            status.tasks.map((task)=>{
                if (task.owner!=null){
                    let owner=task.owner.username;
                    usersWithTasks[owner]=(usersWithTasks[owner]||0)+1;
                }else {
                    usersWithTasks["need owner"] =(usersWithTasks["need owner"]||0)+1;
                }
            })
        });
        return usersWithTasks;
    }

    return (
        <div className={"table-data"}>
        <div className={"scrum_table"}
             onDragOver={(e) => e.preventDefault()}>
            {
                statuses.map((status, i) => {
                    let statusFlag = null;
                    if (i === 0) {
                        statusFlag = "start";
                    }
                    if (i === statuses.length - 1) {
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
                        refreshStatusesFromBackend={refreshStatusesFromBackend}
                        addNewTask={addNewTask}
                        usersOnProject={usersOnProject}
                        projectAuthor = {projectAuthor}
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
        <div className={"task_distribution_container"}>
        {
            Object.entries(getUsersWithTasks(statuses)).map((key) => {
                return <TaskDistibution user={key}/>;
            })
        }
        </div>
        </div>


    );
};

export default ScrumTable;