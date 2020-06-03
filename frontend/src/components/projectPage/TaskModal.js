import React, {useRef, useState} from 'react';
import {Modal, Button} from 'antd';
import 'antd/dist/antd.css';
import {FormOutlined} from "@ant-design/icons";
import {AdderComponent, ContentContainer, Input} from "../styledComps/styled";
import axios from 'axios';


const TaskModal = ({task, setTask}) => {

    const [visible, setVisible] = useState(false);

    const businessValueRef = useRef(task.businessValue);
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
            businessValue: task.businessValue == businessValueRef.current.value ? null : businessValueRef.current.value,
            description: task.description == descriptionRef.current.value && task.description === null ? null : descriptionRef.current.value,
            title: task.title == titleRef.current.value ? null : titleRef.current.value,
            position: task.position == positionRef.current.value ? null : positionRef.current.value
        };
        let axiosResponse = await axios.put("http://localhost:8080/task/edit/" + task.id, editedTask);
        setTask(axiosResponse.data);

    }

    function editTask(businessValue, description, title, position) {
        let newTask = {...task};
        newTask.businessValue = businessValue;
        newTask.description = description;
        newTask.title = title;
        newTask.position = position;
        return newTask;

    }

    function handleOk() {
        let editedTask = editTask(businessValueRef.current.value,
            descriptionRef.current.value,
            titleRef.current.value,
            positionRef.current.value);
        uploadChanges(editedTask);
        setTask(editedTask);
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
                        <label>Title: </label>
                        <input
                            className={"text_input title"}
                            placeholder={"Title"}
                            defaultValue={task.title}
                            ref={titleRef}/>
                        <div className="modal_btn"
                             onClick={handleEdit}>Save
                        </div>
                    </div>
                    <div className={"text_modal"}>
                        <label>Description: </label>
                        <textArea
                            className={"text_input description"}
                            placeholder={"Description"}
                            defaultValue={task.description}
                            ref={descriptionRef}/>
                        <div className="modal_btn"
                             onClick={handleEdit}>Save
                        </div>
                    </div>
                </div>
                <ContentContainer>
                    <AdderComponent>
                        <label>Business value: </label>
                        <Input placeholder={"Business Value"}
                               defaultValue={task.businessValue}
                               ref={businessValueRef}/>
                    </AdderComponent>
                    <AdderComponent>
                        <label>Position: </label>
                        <Input placeholder={"Position"}
                               defaultValue={task.position}
                               ref={positionRef}/>
                    </AdderComponent>
                </ContentContainer>

            </Modal>


        </div>
    );
};

export default TaskModal;