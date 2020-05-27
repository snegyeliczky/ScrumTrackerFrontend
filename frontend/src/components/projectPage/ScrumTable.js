import React, {useState, useContext, useEffect, useRef} from 'react';
import Column from "./Column";
import axios from "axios";

const ScrumTable = ({table}) => {

    const [statuses, setStatuses] = useState(table.statuses);
    const [DragItemColumnId, setDragItemColumnId] = useState();
    const dragItem = useRef(); //dragged task id and status id where it come from



    const deleteStatus = async (statusID) => {
        await axios.delete("http://localhost:8080/project/deletestatus?statusid=" + statusID + "&tableid=" + table.id);
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
        <div className={"scrum_table"}>
             {
                        statuses.map(status => {
                            return <Column
                                deleteStatus={deleteStatus}
                                onDragEnd={onDragEnd}
                                dragItem={dragItem}
                                key={status.id}
                                status={status}
                                onDragEnter={onDragEnter}
                            />

                        })
                    }

        </div>
    );
};

export default ScrumTable;