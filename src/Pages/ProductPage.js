import Header from '../Components/Header';
import Footer from '../Components/Footer';
import MainTitle from '../Components/MainTitle';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProductDetails = async () => {
      const productDoc = doc(db, 'products', id);
      const productData = await getDoc(productDoc);
      if (productData.exists()) {
        setProduct({ ...productData.data(), id: productData.id });
      } else {
        // Handle case where product doesn't exist
      }
    };

    getProductDetails();
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />

      <div className='productPage'>
        <div className='container'>
          <div className='productContainer'>
            <div className='productImage'>
                <img src={product.imageUrl + '?alt=media'} alt={`Product ${product.id}_${product.name}`} />
            </div>

            <div className='productInfo'>
              <h1 className='prName'>{product.name}</h1>
              <p className='prType'>{product.type}</p>
              <h2 className='prPrice'>{product.price}$</h2>
              <p className='prDesc'>{product.description}</p>

              <button className='btn'>Buy It Now</button>
            </div>
          </div>

          <div className='more'>
            <div className='container'>
              <h2>More:</h2>
              <ul>
                <li>{product.feature1}</li>
                <li>{product.feature2}</li>
                <li>{product.feature3}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>

  );
}

export default ProductPage;