import { useTranslation } from 'react-i18next';
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

function Login() {
    const { t, i18n } = useTranslation();

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const login = async (e) => {
        e.preventDefault()
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
        }
        catch(error) {
            console.log(error.message)
        }
    }

    return (
        <div className='login'>
            <div className="container">
                <div className="left">
                    <img src={require('../Images/logoNoBackground.png')} />
                </div>

                <div className="right">
                    <h2>{t("login")}</h2>
                    <p>{t("loginSentence")}</p>

                    <form onSubmit={login}>
                        <div>
                            <label htmlFor='username'>{t("usernameInput")}</label>
                            <input type='text' id='username' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div>
                            <label htmlFor='password'>{t("passwordInput")}</label>
                            <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
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
