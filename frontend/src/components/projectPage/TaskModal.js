import React, {useRef, useState} from 'react';
import {Modal, Button} from 'antd';
import 'antd/dist/antd.css';
import {FormOutlined} from "@ant-design/icons";
import {AdderComponent, ContentContainer, Input} from "../styledComps/styled";


const TaskModal = ({task, setTask}) => {

    const [visible, setVisible] = useState(false);

    const businessValueRef = useRef(task.businessValue);
    const descriptionRef = useRef(task.description);
    const titleRef = useRef(task.title);
    const positionRef = useRef(task.position);

    async function uploadChanges(editedTask) {
        console.log(editedTask);
    }

    function editTask(BusinessValue, Description, Title, Position) {
        let newTask = {...task};
        newTask.businessValue = BusinessValue;
        newTask.description = Description;
        newTask.title = Title;
        newTask.position = Position;
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
                <ContentContainer>
                <AdderComponent>
                    <label>Business value: </label>
                    <Input placeholder={"Business Value"}
                           defaultValue={task.businessValue}
                           ref={businessValueRef}/>
                </AdderComponent>
                <AdderComponent>
                    <label>Description: </label>
                    <Input placeholder={"Description"}
                           defaultValue={task.description}
                           ref={descriptionRef}/>
                </AdderComponent>
                <AdderComponent>
                    <label>Title: </label>
                    <Input placeholder={"Title"}
                           defaultValue={task.title}
                           ref={titleRef}/>
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