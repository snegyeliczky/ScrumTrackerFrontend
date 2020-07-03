import React from 'react';
import { useHistory } from 'react-router-dom';

export default function (OriginalComponent, isPrivate) {
    function AuthCheck(props) {
        const user = localStorage.getItem("username");
        const history = useHistory();

        if (!isPrivate && user !== null) {
            console.log("you are already logged in");
            history.push('/');
        }

        if (isPrivate && user === null) {
            console.log("LOG IN MAN");
            history.push("/login");
        }
        return <OriginalComponent {...props} />

    }
    return AuthCheck;
}