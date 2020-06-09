import React, {useState} from 'react';
import 'antd/dist/antd.css';
import {MailOutlined} from "@ant-design/icons";
import {Button, Modal} from "antd";
import {ContentContainer} from "../styledComps/styled";
import Autocomplete from "react-autocomplete";

const MailModal = () => {

    const [visible, setVisible] = useState(false);
    const [email,setEmail] = useState("");

    function handleCancel() {
        setVisible(false);
    }

    function showModal() {
        setVisible(true);
    }

    function handleSend() {
        console.log(email);
    }

    return (
        <div>
            <MailOutlined onClick={showModal}
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
                    <h2>Send your Project Details</h2>
                </ContentContainer>
                <ContentContainer>
                    <input placeholder={"e-mail"} onChange={event => setEmail(event.target.value)}/>
                    <Button onClick={handleSend}>Send</Button>
                </ContentContainer>
            </Modal>


        </div>
    );
};

export default MailModal;