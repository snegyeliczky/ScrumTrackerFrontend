import React from 'react';
import {SnippetsOutlined} from "@ant-design/icons";

const TaskDistibution = ({user}) => {
    return (
        <div className={"task_distribution"}>
            {user[0]} : {user[1]} <SnippetsOutlined />
        </div>
    );
};

export default TaskDistibution;