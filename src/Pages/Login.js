import { useTranslation } from 'react-i18next';
import { useState, useRef } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebaseConfig";

function Login() {
    const { t, i18n } = useTranslation();

    return (
        <div className='login'>
            <div className="container">
                <div className="left">
                    <img src={require('../Images/logoNoBackground.png')} />
                </div>

                <div className="right">
                    <h2>{t("signup")}</h2>
                    <p>{t("register")}</p>

                    <form>
                        <div>
                            <label htmlFor='username'>{t("usernameInput")}</label>
                            <input type='text' id='username'  />
                        </div>

                        <div>
                            <label htmlFor='password'>{t("passwordInput")}</label>
                            <input type='password' id='password' required/>
                        </div>

                        <button className="btn" type='submit'>{t("login")}</button>

                        <p className="signin-link">{t("dontHasAnAccount")} <a href='Signup'>{t("signup")}</a></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;