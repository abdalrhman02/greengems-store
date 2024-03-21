
import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next'; 

import { auth } from "../firebaseConfig";
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

function Header() {

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
    const signoutBtn = useRef();
    useEffect(() => {
        if (signoutBtn.current) {
            if (user) {
                signoutBtn.current.classList.add('disBlock');
                signoutBtn.current.classList.remove('disNone');
            } else {
                signoutBtn.current.classList.add('disNone');
                signoutBtn.current.classList.remove('disBlock');
            }
        }
    }, [user]);

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

                    <a href="Login"><button className='btn login'>{t('login')}</button></a>
                    <a onClick={logout} ref={signoutBtn}><button className='btn'>Sign Out</button></a>
                </div>

            </div>
        </header>
    )
}

export default Header;