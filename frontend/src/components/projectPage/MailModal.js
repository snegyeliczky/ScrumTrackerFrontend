import React, {useContext, useState} from 'react';
import 'antd/dist/antd.css';
import {MailOutlined} from "@ant-design/icons";
import {Button, Modal} from "antd";
import {ContentContainer} from "../styledComps/styled";
import axios from "axios";
import Alert from "antd/es/alert";
import {ProjectContext} from "../contexts/ProjectContext";

const MailModal = ({projectId}) => {

    const [visible, setVisible] = useState(false);
    const [email,setEmail] = useState("");
    const {showAlert} = useContext(ProjectContext);

    function handleCancel() {
        setVisible(false);
    }

    function showModal() {
        setVisible(true);
    }

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    async function handleSend() {
        let emailCred = {email:email};
        if(validateEmail(email)){
            try {
                await axios.post("http://localhost:8080/project/email/"+projectId,emailCred);
                alert("Succesfull e-mail sending");
                setVisible(false);
            } catch (e) {
                alert("Invalid e-mail adresse try again!");
            }
        }else {
            showAlert("Incorrect Email form use 'example@example.com'-form ");
        }
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