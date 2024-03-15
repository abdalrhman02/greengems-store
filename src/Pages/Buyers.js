import { useTranslation } from 'react-i18next';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ProductCard from '../Components/Product-Card'
import MainTitle from '../Components/MainTitle';

function Buyers() {
    const { t, i18n } = useTranslation();

    return (
       <>
            <Header />
            <MainTitle theTitle={t('buyersTitle')}/>

            <div className='container'>
                <div className='buyers'>
                    <div className='buyer left'>
                        <h1 className='count'>1.</h1>
                        <img src={require('../Images/Buyers/b1.jpeg')} className='msg' />
                        <img src={require('../Images/GIF/marioKartGif.gif')} className='gif' />
                    </div>

                    <div className='buyer right'>
                        <h1 className='count'>2.</h1>
                        <img src={require('../Images/Buyers/b2.jpeg')} className='msg' />
                        <img src={require('../Images/GIF/sonicGif.gif')} className='gif' />
                    </div>

                    <div className='buyer left'>
                        <h1 className='count'>3.</h1>
                        <img src={require('../Images/Buyers/b3.jpeg')} className='msg' />
                        <img src={require('../Images/GIF/zeldaGif.gif')} className='gif zelda' />
                    </div>

                    <div className='buyer right'>
                        <h1 className='count'>4.</h1>
                        <img src={require('../Images/Buyers/b4.jpeg')} className='msg' />
                        <div className='pac'>
                            <img src={require('../Images/GIF/redGhostGif.gif')} className=''/>
                            <img src={require('../Images/GIF/pinkGhostGif.gif')} className=''/>
                            <img src={require('../Images/GIF/blueGhostGif.gif')} className=''/>
                            <img src={require('../Images/GIF/pacmanGif.gif')} className='pacman'/>
                        </div>
                    </div>

                    <div className='buyer left'>
                        <h1 className='count'>5.</h1>
                        <img src={require('../Images/Buyers/b5.jpeg')} className='msg' />
                        <img src={require('../Images/GIF/RyuGif.gif')} className='gif ryu' />
                    </div>
                </div>
            </div>

            <Footer />
       </>
    )
}

export default Buyers;