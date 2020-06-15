import React, {useState} from 'react';
import {Modal, Button} from 'antd';
import 'antd/dist/antd.css';
import {UsergroupAddOutlined, UserAddOutlined, UserOutlined} from "@ant-design/icons";
import {AdderComponent, ContentContainer, Input} from "../../Assets/StyledComps/styled";
import Autocomplete from 'react-autocomplete';
import axios from "axios";


const UsersModal = ({projectId, participants}) => {

    const [value, setValue] = useState();
    const [visible, setVisible] = useState(false);
    const [users, setUsers] = useState([{username: "type for search..."}]);
    const [projectParticipants, setProjectParticipants] = useState(participants);

    async function handelSearchChange(e) {
        let userName = e.target.value;
        setValue(userName);
        if (userName.length > 2) {
            let userObj = {username: userName};
            let axiosResponse = await axios.post("http://localhost:8080/user/search", userObj);
            setUsers(axiosResponse.data);
        }


    }

    function handleCancel() {
        setVisible(false);
    }

    function showModal() {
        setVisible(true);
    }


    async function handleAddUser() {
        let user = {username: value};
        let axiosResponse = await axios.post("http://localhost:8080/project/adduser/" + projectId, user);
        setProjectParticipants(axiosResponse.data);
    }

    return (
        <div>
            <UsergroupAddOutlined onClick={showModal}
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
                    <h2>Invite Participant</h2>
                </ContentContainer>
                <ContentContainer style={{padding: 0, borderBottom: "1px solid", paddingBottom: "1.5rem"}}>
                    <Autocomplete
                        getItemValue={(item) => item.username}
                        items={users}
                        //shouldItemRender={(item, value) => item.username.toLowerCase().indexOf(value.toLowerCase()) > -1}
                        renderItem={(item, highlighted) =>
                            <div
                                key={item.id}
                                style={{backgroundColor: highlighted ? 'yellow' : 'transparent'}}
                            >
                                {item.username}
                            </div>
                        }
                        value={value}
                        onChange={e => handelSearchChange(e)}
                        onSelect={value => setValue(value)}
                    />
                    <UserAddOutlined onClick={handleAddUser}
                                     style={{
                                         fontSize: "30px",
                                         marginLeft: "20px", color: "green"
                                     }}/>
                </ContentContainer>
                <ContentContainer>
                    <h2>Current Participants</h2>
                </ContentContainer>
                <ContentContainer>
                    {projectParticipants.map(participant =>
                        <div className={"participant_users"}>
                            <div className={"user_icon"}><UserOutlined/></div>
                            <h3>{participant.username}</h3>
                        </div>)}
                </ContentContainer>

            </Modal>

        </div>
    );
};

export default UsersModal;