import React, {useState, useContext, useEffect} from 'react';
import {useParams} from "react-router";
import axios from "axios";

const ScrumTable = ({table}) => {

    return (
        <div>
            {table.statuses.map(status => {
                return <div key={status.id}>{status.statusName}</div>
            })}
        </div>
    );
};

export default ScrumTable;