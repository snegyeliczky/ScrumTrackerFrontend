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

    const loginBtnStyle = login ? "btn_active" : "btn_not_active";
    const registrationBtnStyle = login ? "btn_not_active" : "btn_active";

    return (
        <div className="authpage_container">
            <div className="authpage_text">Welcome to ScrumTracker</div>
            <div className="authpage_form">
            <div className="authpage_select_container">
                <div className="authpage_select_btn_container">
                    <div className={loginBtnStyle} onClick={handleLogin}>Sign in</div>
                    <div className={registrationBtnStyle} onClick={handleRegister}>Sign up</div>
                </div>
            </div>

            <div className="authpage_content">
                {login ? <LoginPage/> : <RegistrationPage handleLogin ={handleLogin}/>}
            </div>
            </div>
        </div>
    );
};

export default AuthPage;