import React from 'react';

const TaskDistibution = ({user}) => {
    return (
        <div className={"task_distribution"}>
            {user[0]} : {user[1]}
        </div>
    );
};

export default TaskDistibution;