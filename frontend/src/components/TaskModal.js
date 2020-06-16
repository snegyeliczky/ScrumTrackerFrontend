import React, {useEffect, useRef, useState} from 'react';
import {Modal, Button} from 'antd';
import 'antd/dist/antd.css';
import {FormOutlined} from "@ant-design/icons";
import {AdderComponent, ContentContainer, Input} from "../Assets/StyledComps/styled";
import axios from 'axios';
import TaskCalls from "../Services/TaskCalls";


const TaskModal = ({task, setTask, refreshStatusesFromBackend}) => {

    const [visible, setVisible] = useState(false);

    const priorityRef = useRef(task.priority);
    const descriptionRef = useRef(task.description);
    const titleRef = useRef(task.title);
    const positionRef = useRef(task.position);


    const handleEdit = () => {
        uploadChanges();
    };

    async function uploadChanges() {
        let editedTask = {
            id: null,
            author: null,
            priority: task.priority == priorityRef.current.value ? null : priorityRef.current.value,
            description: task.description == descriptionRef.current.value && task.description === null ? null : descriptionRef.current.value,
            title: task.title == titleRef.current.value ? null : titleRef.current.value,
            position: task.position == positionRef.current.value ? null : positionRef.current.value
        };
        let  axiosResponse = TaskCalls.uploadChanges(task.id,editedTask);
        setTask(axiosResponse.data);
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
                </div>
                <ContentContainer>
                    <AdderComponent>
                        <label>Priority: </label>
                        <Input
                            className="business_value"
                            placeholder={"Business Value"}
                            defaultValue={task.priority}
                            ref={priorityRef}
                            type="number"
                        />
                        <div className="modal_btn"
                             onClick={handleEdit}>Save
                        </div>
                    </AdderComponent>
                </ContentContainer>

            </Modal>


        </div>
    );
};

export default TaskModal;