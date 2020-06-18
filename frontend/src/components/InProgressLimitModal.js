import React, {useContext, useState} from 'react';
import 'antd/dist/antd.css';
import { FileExcelOutlined } from "@ant-design/icons";
import {Button, Modal} from "antd";
import {ContentContainer} from "../Assets/StyledComps/styled";
import {ProjectContext} from "../Contexts/ProjectContext";
import ProjectCalls from "../Services/ProjectCalls";

const InProgressLimitModal = ({tableId, getProject, taskLimit}) => {

    const [visible, setVisible] = useState(false);
    const [limit, setLimit] = useState("");
    const {showErrorAlert,showSuccessAlert} = useContext(ProjectContext);

    function handleCancel() {
        setVisible(false);
    }

    function showModal() {
        setVisible(true);
    }


    async function handleSend() {
        let tableCredentials = {
            id: tableId,
            taskLimit: limit
        };
        try {
            await ProjectCalls.sendProjectInProgressLimit(tableCredentials);
            showSuccessAlert("Successful new limit is: " + tableCredentials.taskLimit);
            setVisible(false);
        } catch (e) {
            showErrorAlert("ooops, something went wrong, try again");
        }
        getProject();
    }

    return (
        <div>
            <FileExcelOutlined onClick={showModal}
                          style={{
                              fontSize: "30px",
                              color: "#373A55",
                              paddingLeft: "10px"
                          }}/>

            <Modal
                visible={visible}
                onCancel={handleCancel}
                footer={null}
                width={400}
            >
                <ContentContainer>
                    <h2>Limit the in progress task count</h2>
                </ContentContainer>
                <ContentContainer>
                    <input placeholder={taskLimit}
                           onChange={event => setLimit(event.target.value)}
                           type="number"
                    />
                    <Button onClick={handleSend}>Send</Button>
                </ContentContainer>
            </Modal>

        </div>
    );
};

export default InProgressLimitModal;