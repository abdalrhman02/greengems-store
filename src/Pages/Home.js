import { useTranslation } from 'react-i18next';
// Hooks
import { useState, useEffect } from 'react';

// Components
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ProductCard from '../Components/Product-Card';

// Routing 
import { useLocation } from 'react-router-dom';

// Firebase
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firebaseConfig";
import { checkPermissions } from '../permessionSer';

function Home() {
  const { t, i18n } = useTranslation();

  const [user] = useAuthState(auth);

  return (
    <>
      <Header />
      {user?.displayName}
      <div className='landing'>
        <div className='container'>
          <div className='landingContent'>
            <h2>{t("landingTitle")}</h2>
            <p>{t("landingTitle")}</p>

            <a href="Store">
              <button className='btn'>{t("landingBtn")}</button>
            </a>
          </div>
        </div>
      </div>

      <div className='productsSection'>
        <div className='container'>
          <div className='products'>
            <ProductCard 
              productCardName={t("productCardName1")}
              productImage={require('../Images/Products/p1.jpeg')}
              productCardFirstFeature={t("productCardFirstFeature1")}
              productCardSecondFeature={t("productCardSecondFeature1")}
              productCardThirdFeature={t("productCardThirdFeature1")}
            />

            <ProductCard 
              productCardName={t("productCardName2")}
              productImage={require('../Images/Products/p2.jpeg')}
              productCardFirstFeature={t("productCardFirstFeature2")}
              productCardSecondFeature={t("productCardSecondFeature2")}
              productCardThirdFeature={t("productCardThirdFeature2")}
            />

            <ProductCard 
              productCardName={t("productCardName3")}
              productImage={require('../Images/Products/p3.png')}
              productCardFirstFeature={t("productCardFirstFeature3")}
              productCardSecondFeature={t("productCardSecondFeature3")}
              productCardThirdFeature={t("productCardThirdFeature3")}
            />
          </div>
          <a href="Store"><button className='btn moreProductsBtn'>{t("moreProductBtn")}</button></a>
        </div>
      </div>

      <div className='aboutus'>
        <div className='container'>
          <div className='text'>
            <h3>{t("aboutusTitle")}</h3>
            <h4>Green Gems Store</h4>
            <p>{t("aboutusPara1")}</p>
            <p style={{marginTop: '20px'}}>{t("aboutusPara2")}</p>
          </div>

          <div className='image'>
            <img src={require('../Images/Ryu.png')} className='ryu'/>

            <img src={require('../Images/GIF/smallRyuGif.gif')} className='smallRyu' />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
