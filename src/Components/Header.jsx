
import { useRef } from 'react';
import { useTranslation } from 'react-i18next'; 

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
                        <a href="#"><li>{t("headerLink3")}</li></a>
                        <a href="Buyers"><li>{t("headerLink4")}</li></a>
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

                    <a href="#" className='shopping-cart'><img className='shopping-cart-img' src={require('../Images/Icons/shopping-cart.png')} /></a>
                    <a href="Signup"><button className='btn'>{t('login')}</button></a>
                </div>

            </div>
        </header>
    )
}

export default Header;