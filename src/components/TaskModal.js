import React, {useContext, useRef, useState} from 'react';
import {Modal, DatePicker} from 'antd';
import 'antd/dist/antd.css';
import {FormOutlined} from "@ant-design/icons";
import {ContentContainer} from "../Assets/StyledComps/styled";
import TaskCalls from "../Services/TaskCalls";
import Select from "antd/es/select";
import moment from 'moment';
import {ProjectContext} from "../Contexts/ProjectContext";



const TaskModal = ({task, setTask, refreshStatusesFromBackend, usersOnProject}) => {

    const {Option} = Select;
    const priorityList = Array.from({length: 10}, (k, v) => v + 1);

    const {showErrorAlert} = useContext(ProjectContext);
    const [visible, setVisible] = useState(false);
    const [priorityRef, setPriorityRef] = useState(task.priority);
    const [ownerRef, setOwnerRef] = useState(task.owner);
    const descriptionRef = useRef(task.description);
    const titleRef = useRef(task.title);
    const positionRef = useRef(task.position);
    const [deadlineRef,setDeadlineRef] = useState(task.deadline);

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


    function handleOk() {
        setVisible(false);
    }

    function handleCancel() {
        setVisible(false);
    }

    function showModal() {
        setVisible(true)
    }

    function handleTimeChange(date, dateString){
        date= new Date(date);
        setDeadlineRef(date);
    }


    return (
        <div>
            <FormOutlined onClick={showModal}/>
            <Modal
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
                footer={null}
            >
                <h2>Edit Task</h2>
                <div className={"task_modal"}>
                    <div className={"text_modal"}>
                        <label>Title: </label>
                        <input
                            className={"text_input title"}
                            placeholder={"Story Title"}
                            defaultValue={task.title}
                            ref={titleRef}/>
                        <div className="modal_btn"
                             onClick={handleEdit}>Save
                        </div>
                    </div>
                    <div className={"text_modal"}>
                        <label>Description: </label>
                        <textArea
                            className={"text_input userStory"}
                            placeholder={"user story"}
                            ref={descriptionRef}>
                            {task.description}
                        </textArea>
                        <div className="modal_btn"
                             onClick={handleEdit}>Save
                        </div>
                    </div>
                    <ContentContainer>
                        <div className={"task_data_selector"}>
                            <label>Priority: </label>
                            <Select
                                style={{width:"90%"}}
                                className={"priority"}
                                defaultValue={task.priority}
                                onChange={(value) => {
                                    setPriorityRef(value);
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
                            <div className="modal_btn"
                                 onClick={handleEdit}>Save
                            </div>
                        </div>
                        <div className={"task_data_selector"}>
                            <label>Owner: </label>
                            <Select
                                style={{width:"90%"}}
                                className={"owner"}
                                defaultValue={task.owner ? task.owner.username : "No Owner Yet"}
                                onChange={(value) => {
                                    usersOnProject.map((user) => {
                                        if (user.username === value) {
                                            setOwnerRef(user);
                                        }
                                    });
                                }}>
                                {usersOnProject.map((user) => {
                                    return <Option key={user.id} value={user.username}>{user.username}</Option>
                                })}

                            </Select>
                            <div className="modal_btn"
                                 onClick={handleEdit}>Save
                            </div>
                        </div>
                        <div className={"task_data_selector"}>
                            <label>Deadline: </label>
                            <DatePicker
                                //locale={locale}
                                style={{width:"90%"}}
                                className={"deadline_picker"}
                                defaultValue={deadlineRef?moment(deadlineRef):''}
                                format={'MM.DD'/* + "hh.mm"*/}
                                onChange={handleTimeChange}
                                //showTime={true}
                            />

                            <div className="modal_btn"
                                 onClick={handleEdit}>Save
                            </div>
                        </div>
                    </ContentContainer>
                </div>

            </Modal>


        </div>
    );
};

export default TaskModal;