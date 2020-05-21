import React, {useState, useContext, useEffect} from 'react';
import {useParams} from "react-router";
import axios from "axios";
import Column from "./Column";

const ScrumTable = ({table}) => {

    return (
        <div>
            {table.statuses.map(status => {
                return <Column key={status.id} status={status} />
            })}
        </div>
    );
};

export default ScrumTable;