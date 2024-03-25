
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next'; 

import { auth } from "../firebaseConfig";
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db } from "../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

function Header() {

    // Change Languages
    let langBar = useRef();
    const openLang = () => {
        if(langBar.current.classList.contains('disNone')) {
            langBar.current.classList.remove('disNone');
            langBar.current.classList.add('disFlex');
        } else {
            langBar.current.classList.add('disNone');
            langBar.current.classList.remove('disFlex');
        }
    }

    let body = document.querySelector('body');
    const { t, i18n } = useTranslation();
    const changeEN = () => {
        i18n.changeLanguage("en");
        body.style.cssText = "font-family: 'Retro Gaming'";
    }
    const changeAR = () => {
        i18n.changeLanguage("ar");
        body.style.cssText = "font-family: 'Alexandria'";
    }


    // Logout Button
    const logout = async () => {
        await signOut(auth);
    }

    const [ user ] = useAuthState(auth);
    const loginBtn = useRef();
    const signoutBtn = useRef();
    useEffect(() => {
        if (signoutBtn.current) {
            if (user) {
                signoutBtn.current.classList.add('disBlock');
                signoutBtn.current.classList.remove('disNone');

                loginBtn.current.classList.add('disNone');
                loginBtn.current.classList.remove('disBlock');
            } else {
                signoutBtn.current.classList.add('disNone');
                signoutBtn.current.classList.remove('disBlock');

                loginBtn.current.classList.add('disBlock');
                loginBtn.current.classList.remove('disNone');
            }
        }
    }, [user]);


    // Admin Role
    const [userId, setUserId] = useState(null); // Initialize userId state
    useEffect(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            setUserId(currentUser.uid);
        }
    }, []);

    const handleAdminRole = () => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            // User is logged in, change role to Admin
            changeUserRoleToAdmin(currentUser.uid);
        } else {
            // No user is logged in, display error message or handle accordingly
            console.error("No user is currently logged in.");
        }
    };
    const changeUserRoleToAdmin = async (userId) => {
        try {
            const userRef = doc(db, "users", userId);
    
            await updateDoc(userRef, {
                role: "Admin",
            });
    
            console.log(`User role changed to Admin successfully for user with ID: ${userId}`);
        } catch (error) {
            console.error("Error changing user role:");
        }
    };


    return (
        <header>
            <div className="container">
                <div className='left'>
                    <div className="logo">
                        <img src={require('../Images/logoNoBackground.png')} />
                    </div>

                    <ul>
                        <a href="/"><li>{t("headerLink1")}</li></a>
                        <a href="Store"><li>{t("headerLink2")}</li></a>
                        <a href="Buyers"><li>{t("headerLink3")}</li></a>
                    </ul>
                </div>

                <div className='right'>
                <div className='changeLang' onClick={openLang}>
                        <img src={require('../Images/Icons/down-arrow.png')} className='downArrow-icon' />
                        <img src={require('../Images/Icons/global.png')} className='global-icon' />

                        <div className='langs disNone' ref={langBar}>
                            <button onClick={changeEN}>English</button>
                            <button onClick={changeAR}>العربية</button>
                        </div>
                    </div>

                    <a href="Login" ref={loginBtn}><button className='btn login'>{t('login')}</button></a>
                    <a onClick={logout} ref={signoutBtn}><button className='btn'>Sign Out</button></a>
                    <button className='btn' onClick={handleAdminRole}>Admin Role</button>
                </div>

            </div>
        </header>
    )
}

export default Header;