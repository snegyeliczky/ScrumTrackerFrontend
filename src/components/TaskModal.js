import React, {useContext, useRef, useState} from 'react';
import {Modal, DatePicker, Button} from 'antd';
import 'antd/dist/antd.css';
import {FormOutlined} from "@ant-design/icons";
import {ContentContainer} from "../Assets/StyledComps/styled";
import TaskCalls from "../Services/TaskCalls";
import Select from "antd/es/select";
import moment from 'moment';
import {ProjectContext} from "../Contexts/ProjectContext";


const TaskModal = ({task, setTask, refreshStatusesFromBackend, usersOnProject}) => {

    const {Option} = Select;
    const priorityList = Array.from({length: 5}, (k, v) => v + 1);

    const {showErrorAlert} = useContext(ProjectContext);
    const [visible, setVisible] = useState(false);
    const [priorityRef, setPriorityRef] = useState(task.priority);
    const [ownerRef, setOwnerRef] = useState(task.owner);
    const descriptionRef = useRef(task.description);
    const titleRef = useRef(task.title);
    const positionRef = useRef(task.position);
    const [deadlineRef, setDeadlineRef] = useState(task.deadline);
    const [disabledBtn, setDisabledBtn] = useState(true);

    /*
    const options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric'
    };
    */

    const handleEdit = () => {
        if (titleRef.current.value === "") {
            showErrorAlert("please add name to your task");
            titleRef.current.value = task.title;
            return;
        }
        uploadChanges();
        handleCancel();
    };

    async function uploadChanges() {
        let editedTask = {
            id: null,
            author: null,
            position: task.position === positionRef.current.value ? null : positionRef.current.value,
            priority: task.priority === priorityRef ? null : priorityRef,
            description: task.description === descriptionRef.current.value && task.description === null ? null : descriptionRef.current.value,
            title: task.title === titleRef.current.value ? null : titleRef.current.value,
            owner: task.owner === ownerRef ? null : ownerRef,
            deadline: task.deadline === deadlineRef ? null : deadlineRef
        };
        let axiosResponse = await TaskCalls.uploadChanges(task.id, editedTask);
        setTask(axiosResponse);
        refreshStatusesFromBackend();
    }


    function handleCancel() {
        setVisible(false);
        setDisabledBtn(true);
    }

    function showModal() {
        setVisible(true)
    }

    function handleTimeChange(date, dateString) {
        date = new Date(date);
        setDeadlineRef(date);
        setDisabledBtn(false);
    }



    return (
        <div>
            <FormOutlined onClick={showModal}/>
            <Modal
                visible={visible}
                onCancel={handleCancel}
                width={800}
                footer={[
                    <Button key="submit" type="primary"
                            onClick={handleEdit} disabled={disabledBtn}>
                        Save & Close
                    </Button>]}
            >
                <h2>Edit Task</h2>
                <div className={"task_modal"}>
                    <div className={"text_modal"}>
                        <label>Title: </label>
                        <input
                            className={"text_input title"}
                            placeholder={"Story Title"}
                            defaultValue={task.title}
                            ref={titleRef}
                            onChange={event => { setDisabledBtn(false)}}
                        />
                    </div>
                    <div className={"text_modal"}>
                        <label>Description: </label>
                        <textArea
                            className={"text_input userStory"}
                            placeholder={"user story"}
                            ref={descriptionRef}
                            onChange={event => { setDisabledBtn(false)}}
                            >
                            {task.description}
                        </textArea>
                    </div>
                    <ContentContainer>
                        <div className={"task_data_selector"}>
                            <label>Priority: </label>
                            <Select
                                style={{width: "90%"}}
                                className={"priority"}
                                defaultValue={task.priority}
                                onChange={(value) => {
                                    setPriorityRef(value);
                                    setDisabledBtn(false)

                                }
                                }
                                type="number"
                            >
                                {
                                    priorityList.map((num) => {
                                        return <Option key={num} value={num}>{num}</Option>
                                    })
                                }
                            </Select>
                        </div>
                        <div className={"task_data_selector"}>
                            <label>Owner: </label>
                            <Select
                                style={{width: "90%"}}
                                className={"owner"}
                                defaultValue={task.owner ? task.owner.username : "No Owner Yet"}
                                onChange={(value) => {
                                    usersOnProject.map((user) => {
                                        if (user.username === value) {
                                            setOwnerRef(user);

                                        }
                                    });
                                    setDisabledBtn(false)
                                }}>
                                {usersOnProject.map((user) => {
                                    return <Option key={user.id} value={user.username}>{user.username}</Option>
                                })}

                            </Select>
                        </div>
                        <div className={"task_data_selector"}>
                            <label>Deadline: </label>
                            <DatePicker
                                style={{width: "90%"}}
                                className={"deadline_picker"}
                                defaultValue={deadlineRef ? moment(deadlineRef) : ''}
                                format={'MM.DD'/* + "hh.mm"*/}
                                onChange={handleTimeChange}
                            />

                        </div>
                    </ContentContainer>
                </div>

            </Modal>


        </div>
    );
};

export default TaskModal;