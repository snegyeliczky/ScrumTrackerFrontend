import React, {useState} from 'react';
import {Modal, Button} from 'antd';
import 'antd/dist/antd.css';
import {FormOutlined,CheckOutlined} from "@ant-design/icons";
import {AdderComponent, ContentContainer, Input} from "../styledComps/styled";
import Autocomplete from 'react-autocomplete';
import axios from "axios";


const UsersModal = ({projectId,participants}) => {

    const [value,setValue] = useState();
    const [visible, setVisible] = useState(false);
    const [users, setUsers] = useState([{username:"type for search..."}]);
    const [projectParticipants,setProjectParticipants]=useState(participants);

    async function handelSearchChange(e) {
        let userName=e.target.value;
        setValue(userName);
        if (userName.length>2){
            let userObj = {username:userName};
            let axiosResponse = await axios.post("http://localhost:8080/user/search", userObj);
            console.log(axiosResponse.data);
            setUsers(axiosResponse.data);
        }



    }

    function handleOk() {
        console.log("ok");
        setVisible(false);
    }

    function handleCancel() {
        setVisible(false);
    }

    function showModal() {
        setVisible(true);
    }



    async function handleAddUser() {
        let user = {username:value};
        console.log(user);
        let axiosResponse = await axios.post("http://localhost:8080/project/adduser/"+projectId,user);
        setProjectParticipants(axiosResponse.data);
    }

    return (
        <div>

            <CheckOutlined onClick={showModal}/>
            <Modal
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
            >
                <Autocomplete
                    getItemValue={(item) => item.username}
                    items={users}
                    //shouldItemRender={(item, value) => item.username.toLowerCase().indexOf(value.toLowerCase()) > -1}
                    renderItem={(item, highlighted) =>
                        <div
                            key={item.id}
                            style={{ backgroundColor: highlighted ? 'yellow' : 'transparent'}}
                        >
                            {item.username}
                        </div>
                    }
                    value={value}
                    onChange={e => handelSearchChange(e)}
                    onSelect={value => setValue(value)}
                />
                <CheckOutlined onClick={handleAddUser} />
                {projectParticipants.map(participant =><h2>{participant.username}</h2>)}

            </Modal>

        </div>
    );
};

export default UsersModal;