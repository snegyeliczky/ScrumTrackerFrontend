import React, {useState} from 'react';
import RegistrationPage from "./Registration";
import LoginPage from "./Login";
import '../customCSS/AuthStyle.css';

const AuthPage = () => {

    const [login, setLogin] = useState(true);

    const handleLogin = () => {
        setLogin(true);
    };

    const handleRegister = () => {
        setLogin(false);
    };

    const loginBtnStyle = login ? "btn_not_active" : "btn_active";
    const registrationBtnStyle = login ? "btn_active" : "btn_not_active";

    return (
        <div className="authpage_container">
            <div className="authpage_form">
            <div className="authpage_select_container">
                <div className="authpage_select_btn">
                    <button className={loginBtnStyle} onClick={handleLogin}>Sign in</button>
                    <button className={registrationBtnStyle} onClick={handleRegister}>Registration</button>
                </div>
            </div>

            <div className="authpage_content">
                {login ? <LoginPage/> : <RegistrationPage/>}
            </div>
            </div>
        </div>
    );
};

export default AuthPage;