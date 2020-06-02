import React, {useRef, useState} from 'react';
import {Modal, Button} from 'antd';
import 'antd/dist/antd.css';
import {FormOutlined} from "@ant-design/icons";
import {AdderComponent, ContentContainer, Input} from "../styledComps/styled";


const TaskModal = ({task, setTask}) => {

    const [visible, setVisible] = useState(false);

    const BusinessValueRef = useRef(task.businessValue);
    const DescriptionRef = useRef(task.description);
    const TitleRef = useRef(task.title);
    const PositionRef = useRef(task.position);

    function editTask(BusinessValue,Description,Title,Position) {
        let newTask = {...task};
        newTask.businessValue = BusinessValue;
        newTask.description = Description;
        newTask.title = Title;
        newTask.position = Position;
        return newTask;

    }

    function handleOk() {
        let editedTask = editTask(BusinessValueRef.current.value,
            DescriptionRef.current.value,
            TitleRef.current.value,
            PositionRef.current.value);

            setTask(editedTask);
            setVisible(false);


    }

    function handleCancel() {
        console.log(task);
        setVisible(false);
    }

    function showModal() {
        setVisible(true)
    }

    return (
        <div>
            < FormOutlined onClick={showModal}/>
            <Modal
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <h2>Edit Task</h2>
                <ContentContainer>
                <AdderComponent>
                    <label>Business value: </label>
                    <Input placeholder={"Business Value"}
                           defaultValue={task.businessValue}
                           ref={BusinessValueRef}/>
                </AdderComponent>
                <AdderComponent>
                    <label>Description: </label>
                    <Input placeholder={"Description"}
                           defaultValue={task.description}
                           ref={DescriptionRef}/>
                </AdderComponent>
                <AdderComponent>
                    <label>Title: </label>
                    <Input placeholder={"Title"}
                           defaultValue={task.title}
                           ref={TitleRef}/>
                </AdderComponent>
                <AdderComponent>
                    <label>Position: </label>
                    <Input placeholder={"Position"}
                           defaultValue={task.position}
                           ref={PositionRef}/>
                </AdderComponent>
                </ContentContainer>

            </Modal>


        </div>
    );
};

export default TaskModal;