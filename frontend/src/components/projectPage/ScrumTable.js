import React, {useState, useContext, useEffect, useRef} from 'react';
import Column from "./Column";
import axios from "axios";
import {ContentContainer} from "../styledComps/styled"

const ScrumTable = ({table}) => {

    const [statuses, setStatuses] = useState(table.statuses);
    const [DragItemColumnId, setDragItemColumnId] = useState();
    const dragItem = useRef(); //dragged task id and status id where it come from




    const deleteStatus = async (statusID) => {
        await axios.delete("http://localhost:8080/project/deletestatus?statusid=" + statusID + "&tableid=" + table.id);
        refreshStatusesFromBackend();
    };

    const refreshStatusesFromBackend = async () =>{
        let axiosResponse = await axios.get("http://localhost:8080/project/gettable/" + table.id);
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

    //

    return (
        <ContentContainer className={"scrum_table"}
        onDragOver={(e)=>e.preventDefault()}>
             {
                        statuses.map((status, i) => {
                            let statusFlag = null;

                            if (i===0){
                                statusFlag="start";
                            }
                            if (i===statuses.length-1){
                                statusFlag="finish";
                            }

                            return <Column
                                statusFlag = {statusFlag}
                                deleteStatus={deleteStatus}
                                onDragEnd={onDragEnd}
                                dragItem={dragItem}
                                key={status.id}
                                status={status}
                                onDragEnter={onDragEnter}
                                refreshStatusesFromBackend ={refreshStatusesFromBackend}
                            />

                        })
                    }

        </ContentContainer>
    );
};

export default ScrumTable;