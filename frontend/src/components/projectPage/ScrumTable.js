import React, {useState, useContext, useEffect, useRef} from 'react';
import Column from "./Column";
import axios from "axios";
import {ContentContainer} from "../styledComps/styled"
import {PlusOutlined} from "@ant-design/icons";
import UseComponentVisible from "../UseComponentVisible";

const ScrumTable = ({table, addNewColumn, addNewTask}) => {

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
        await axios.delete("http://localhost:8080/project/deletestatus?statusid=" + statusID + "&tableid=" + table.id);
        refreshStatusesFromBackend();
    };

    const refreshStatusesFromBackend = async () => {
        let axiosResponse = await axios.get("http://localhost:8080/project/gettable/" + table.id);
        axiosResponse.data.statuses.sort(function (a, b) {
            return a.position - b.position;
        });
        axiosResponse.data.statuses.map(status =>{
            status.tasks.sort(function (a,b) {
                return a.position - b.position;
            })
        });

        setStatuses(axiosResponse.data.statuses);
    };

    const uploadStatusChangeToDatabase = async () => {
        let refreshItem = {
            toStatusId: DragItemColumnId,
            fromStatusId: dragItem.current.statusId,
            taskId: dragItem.current.taskObject.id
        };
        await axios.put("http://localhost:8080/task/transfer", refreshItem);
    };


    const onDragEnter = (newStatusId) => {
        setDragItemColumnId(newStatusId);
    };

    const onDragEnd = () => {
        setStatuses(refreshStatus(DragItemColumnId));
        uploadStatusChangeToDatabase();
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