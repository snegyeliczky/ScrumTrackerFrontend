import React, {useContext, useState} from 'react';
import Alert from "antd/es/alert";
import {Modal} from "antd";
import {ProjectContext} from "./contexts/ProjectContext";

const AlertModal = () => {

    const {
        alertVisible,
        handleAlertCancel,
        alertText,
        } = useContext(ProjectContext);



    return (
            <Modal
                visible={alertVisible}
                onCancel={handleAlertCancel}
                footer={null}
                width={400}
            >
            <Alert
                message="Error"
                description={alertText}
                type="error"
                showIcon
                style={{border:"0px"}}
            />
            </Modal>
    );
};

export default AlertModal;