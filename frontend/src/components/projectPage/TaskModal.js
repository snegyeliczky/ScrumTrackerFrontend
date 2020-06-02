import React, {useState} from 'react';
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';
import { FormOutlined } from "@ant-design/icons";


const TaskModal = () => {

    const [visible,setVisible] = useState(false);

    function handleOk() {
        console.log("halli")
    }

    function handleCancel() {
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
                <h2>Hello Modal</h2>
            </Modal>

            
        </div>
    );
};

export default TaskModal;