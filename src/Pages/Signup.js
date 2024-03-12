import { useTranslation } from 'react-i18next';
import { useState, useRef } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebaseConfig";

function Signup() {
    const { t, i18n } = useTranslation();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [repeatEmail, setRrepeatEmail] = useState("");

    const usernameInpRef = useRef();
    const passwordInpRef = useRef();
    const emailInpRef = useRef();
    const repeatEmailInpRef = useRef();

    const [usernameValid, setUsernameValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [repeatEmailValid, setRepeatEmailValid] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();

        if(username.length < 4) {
            usernameInpRef.current.style.border = '2px solid red';
            return;
        } else {
            usernameInpRef.current.style.border = '1px solid #333333'
            setUsernameValid(true)
        }
        
        if (password.length < 10){
            passwordInpRef.current.style.border = '2px solid red';
            return;
        } else {
            passwordInpRef.current.style.border = '1px solid #333333'
            setPasswordValid(true)
        }

        const emailEx = 'example@email.com';
        if(!/\S+@\S+\.\S+/.test(emailEx)) {
            emailInpRef.current.style.border = '2px solid red';
            return;
        } else {
            emailInpRef.current.style.border = '1px solid #333333'
            setEmailValid(true)
        }
        
        
        if (repeatEmail.value !== email.value) {
            repeatEmailInpRef.current.style.border = '2px solid red';
            return;
        } else {
            setRepeatEmailValid(true)
        }
        
        
        if (usernameValid && passwordValid && emailValid && repeatEmailValid === true) {
            console.log('DONE!')
            try {
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
    
                const user = userCredential.user;
                await updateProfile(user, { displayName: username });
            }
            catch(error) {
                alert(error.message)
            }
        } else {
            console.log("There is Error!")
        }

    }

    return (
        <div className='signup'>
            <div className="container">
                <div className="left">
                    <img src={require('../Images/logoNoBackground.png')} />
                </div>

                <div className="right">
                    <h2>{t("signup")}</h2>
                    <p>{t("register")}</p>

                    <form onSubmit={handleSignup}>
                        <div>
                            <label htmlFor='username'>{t("usernameInput")}</label>
                            <input type='text' id='username' ref={usernameInpRef} onChange={(e) => setUsername(e.target.value)} />
                        </div>

                        <div>
                            <label htmlFor='password'>{t("passwordInput")}</label>
                            <input type='password' id='password' ref={passwordInpRef} onChange={(e) => setPassword(e.target.value)} required/>
                        </div>

                        <div>
                            <label htmlFor='email'>{t("emailInput")}</label>
                            <input type='email' id='email' ref={emailInpRef} onChange={(e) => setEmail(e.target.value)} required/>
                        </div>

                        <div>
                            <label htmlFor='repeatEmail'>{t("repeatEmailInput")}</label>
                            <input type='email' id='repeatEmail' ref={repeatEmailInpRef} />
                        </div>


                        <button className="btn" type='submit'>{t("signup")}</button>

                        <p className="signin-link">{t("hasAnAccount")} <a href='Login'>{t("login")}</a></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;