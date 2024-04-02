
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ProductCard from '../Components/Product-Card'
import MainTitle from '../Components/MainTitle';

// Firebase Imports
import { db } from '../firebaseConfig';
import { getDocs, addDoc, deleteDoc, doc, updateDoc , collection } from 'firebase/firestore';
import { getStorage, ref , uploadBytes, getDownloadURL  } from 'firebase/storage';


function Home() {
  const { t, i18n } = useTranslation();

  const [productsList, setProductsList] = useState([]);
  const productsCollection = collection(db, "products");

  const getProductsList = async () => {
      const data = await getDocs(productsCollection);
      const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
      setProductsList(filteredData);
  }
  useEffect(() => {
    getProductsList()
  }, []);

  console.log(productsList)

  return (
    <>
      <Header />

      <MainTitle theTitle={t('storeTitle')}/>

      <div className='store'>
        <div className='container' >
          <div className='products'>
            {productsList.map((product) => (
              <div className='product'>
                <h1 className='productName'>{product.name}</h1>

                <div className='image'>
                  <img src={product.imageUrl + '?alt=media'} alt={`Product ${product.id}_${product.name}`} />
                </div>

                {/* <p>{product.type}</p> */}
                <h2 className='productPrice'>{product.price}$</h2>
                <div className='buttons'>
                  <Link to={`/product/${product.id}`}><button className='btn'>Buy It</button></Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      <Footer />
    </>
  );
}

export default Home;
