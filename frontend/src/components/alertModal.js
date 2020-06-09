import React, {useContext, useState} from 'react';
import Alert from "antd/es/alert";
import {Modal} from "antd";
import {ProjectContext} from "./contexts/ProjectContext";

const AlertModal = () => {

    const {
        alertVisible,
        handleAlertCancel,
        alertText,
        alertType
        } = useContext(ProjectContext);



    return (
            <Modal
                visible={alertVisible}
                onCancel={handleAlertCancel}
                footer={null}
                width={400}
            >
            <Alert
                message={alertType==="error"?"Error":"Success"}
                description={alertText}
                type={alertType}
                showIcon
                style={{border:"0px", backgroundColor: "inherit"}}
            />
            </Modal>
    );
};

export default AlertModal;