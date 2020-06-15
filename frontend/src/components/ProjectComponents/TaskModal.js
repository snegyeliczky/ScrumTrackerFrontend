import React, {useEffect, useRef, useState} from 'react';
import {Modal, Button} from 'antd';
import 'antd/dist/antd.css';
import {FormOutlined} from "@ant-design/icons";
import {AdderComponent, ContentContainer, Input} from "../../Assets/StyledComps/styled";
import axios from 'axios';


const TaskModal = ({task, setTask, refreshStatusesFromBackend}) => {

    const [visible, setVisible] = useState(false);

    const businessValueRef = useRef(task.businessValue);
    const acceptanceCriteriaRef = useRef(task.acceptanceCriteria);
    const userStoryRef = useRef(task.userStory);
    const titleRef = useRef(task.storyTitle);
    const positionRef = useRef(task.position);


    const handleEdit = () => {
        uploadChanges();
    };

    async function uploadChanges() {
        let editedTask = {
            id: null,
            author: null,
            businessValue: task.businessValue == businessValueRef.current.value ? null : businessValueRef.current.value,
            userStory: task.userStory == userStoryRef.current.value && task.userStory === null ? null : userStoryRef.current.value,
            acceptanceCriteria: task.acceptanceCriteria == acceptanceCriteriaRef.current.value && task.acceptanceCriteria === null ? null : acceptanceCriteriaRef.current.value,
            title: task.storyTitle == titleRef.current.value ? null : titleRef.current.value,
            position: task.position == positionRef.current.value ? null : positionRef.current.value
        };
        let axiosResponse = await axios.put("http://localhost:8080/task/edit/" + task.id, editedTask);
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
            >
                <h2>Edit Task</h2>
                <div className={"task_modal"}>
                    <div className={"text_modal"}>
                        <label>Story Title: </label>
                        <input
                            className={"text_input title"}
                            placeholder={"Story Title"}
                            defaultValue={task.storyTitle}
                            ref={titleRef}/>
                        <div className="modal_btn"
                             onClick={handleEdit}>Save
                        </div>
                    </div>
                    <div className={"text_modal"}>
                        <label>User Story: </label>
                        <textArea
                            className={"text_input userStory"}
                            placeholder={"user story"}
                            ref={userStoryRef}>
                            {task.userStory}
                        </textArea>
                        <div className="modal_btn"
                             onClick={handleEdit}>Save
                        </div>
                    </div>
                    <div className={"text_modal"}>
                        <label>Acceptance Criteria: </label>
                        <textArea
                            className={"text_input userStory"}
                            placeholder={"acceptance criteria"}
                            defaultValue={task.acceptanceCriteria}
                            ref={acceptanceCriteriaRef}>
                            {task.acceptanceCriteria}
                        </textArea>
                        <div className="modal_btn"
                             onClick={handleEdit}>Save
                        </div>
                    </div>
                </div>
                <ContentContainer>
                    <AdderComponent>
                        <label>Business value: </label>
                        <Input
                            className="business_value"
                            placeholder={"Business Value"}
                            defaultValue={task.businessValue}
                            ref={businessValueRef}
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