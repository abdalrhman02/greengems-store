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

            <div className='buyers'>
                <div className='buyer'>
                    <img src={require('../Images/Buyers/b1.jpeg')} className='msg' />
                    <img src={require('../Images/GIF/marioKartGif.gif')} className='gif' />
                </div>
            </div>
       </>
    )
}

export default Buyers;