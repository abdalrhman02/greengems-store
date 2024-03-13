
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

  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState(0);
  const [newProductDesc, setNewProductDesc] = useState('');
  const [newProductType, setNewProductType] = useState('');
  const [newProductFeature1, setNewProductFeature1] = useState('');
  const [newProductFeature2, setNewProductFeature2] = useState('');
  const [newProductFeature3, setNewProductFeature3] = useState('');

  // Add Product
  const addProduct = async () => {
    const newProductRef = await addDoc(productsCollection, {
      name: newProductName,
      price: newProductPrice, 
      description: newProductDesc,
      type: newProductType,
      feature1: newProductFeature1,
      feature2: newProductFeature2,
      feature3: newProductFeature3,
    });
    
    console.log(newProductRef)
  
    // Upload image for the newly added product
    uploadImage(newProductRef.id);
    getProductsList();
  };
  
  const [imageUpload, setImageUpload] = useState(null); 
  const uploadImage = async (productId) => {
    if (!imageUpload) return;

    const storageRef = ref(getStorage(), `images/${productId}_${imageUpload.name}`);
    await uploadBytes(storageRef, imageUpload);

    // Get download URL and update product in Firestore
    const imageUrl = await getDownloadURL(storageRef);
    const productDoc = doc(db, 'products', productId);
    await updateDoc(productDoc, { imageUrl });
  };

  const updateProductImage = async (productId, imageUrl) => {
    const productDoc = productsCollection.doc(productId);
    await productDoc.update({ imageUrl });
  };


  // Delete Product 
  const deleteProduct = async (id) => {
    const productDoc = doc(db, 'products', id);
    await deleteDoc(productDoc);
    getProductsList()
  };


  // const fs = require('fs');
  const prNameInp = useRef()
  // // Function to update the JSON file with the input value
  // function updateJsonFile(value) {
  //     const data = { productName: value };

  //     // Write data to JSON file
  //     fs.writeFileSync('en.json', JSON.stringify(data, null, 2));
  // }

  console.log(prNameInp.current)

  return (
    <>
      <Header />

      <MainTitle />

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
                <button className='btn' onClick={() => {deleteProduct(product.id)}}>Delete This Product</button>
                <Link to={`/product/${product.id}`}><button className='btn'>Buy It</button></Link>
              </div>
            </div>
          ))}
        </div>


        <div className='addProduct'>
          <h2>Add New Product:</h2>

          <div className='productDetails'>
            <div>
              <label>Name:</label>
              <input type='text' placeholder='Product Name' ref={prNameInp} onChange={(e) => setNewProductName(e.target.value)} />
            </div>

            <div>
              <label>Description:</label>
              <input type='text' placeholder='Product Description' onChange={(e) => setNewProductDesc(e.target.value)} />
            </div>

            <div>
              <label>Price:</label>
              <input type='number' placeholder='Product Price' onChange={(e) => setNewProductPrice(e.target.value)} />
            </div>

            <div>
              <label>Type:</label>
              <input type='text' placeholder='Product Type' onChange={(e) => setNewProductType(e.target.value)} />
            </div>
            
            <input type='file' onChange={(e) => setImageUpload(e.target.files[0])} className='imageInp' />
          </div>

          <div className='productDetails'>
            <div>
              <label>Feature 1:</label>
              <input type='text' placeholder='Product Name' onChange={(e) => setNewProductFeature1(e.target.value)} />
            </div>

            <div>
              <label>Feature 2:</label>
              <input type='text' placeholder='Product Description' onChange={(e) => setNewProductFeature2(e.target.value)} />
            </div>

            <div>
              <label>Feature 3:</label>
              <input type='text' placeholder='Product Price' onChange={(e) => setNewProductFeature3(e.target.value)} />
            </div>
            
          </div>


          <button className='addBtn btn' onClick={() => {
            addProduct();
            uploadImage();
          }}>Add Product</button>

        </div>
      </div>


      <Footer />
    </>
  );
}

export default Home;
