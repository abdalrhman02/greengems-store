
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import Footer from '../Components/Footer';

// Firebase Imports
import { auth, db } from '../firebaseConfig';
import { getDocs, getDoc, addDoc, deleteDoc, doc, updateDoc , collection } from 'firebase/firestore';
import { getStorage, ref , uploadBytes, getDownloadURL  } from 'firebase/storage';



function AdminPage() {
    const { t, i18n } = useTranslation();

        const checkPermissions = async (userId) => {
          try {
              const userDocRef = doc(db, 'users', userId);
              const userDocSnapshot = await getDoc(userDocRef);
          
              if (userDocSnapshot.exists()) {
                  const userData = userDocSnapshot.data();
                  const userRole = userData.role;

                  if (userRole === 'Admin') {
                    window.location.href = '/AdminPage'
                  } else {
                    window.location.href = '/'
                  }
              }
          } catch (error) {
              console.error('Error checking permissions:', error);
          }
        };

      useEffect(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
          console.log("THERE IS A USER !")
          checkPermissions(currentUser.uid)
        } else {
          console.log("NO USER !")
        }
      }, [])


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

    return (
        <div className='adminPage'>
            <header>
                <img src={require('../Images/logoNoBackground.png')} />
                <h2>{t("APHeader")}</h2>
            </header>


            <div className='container' >
              <div className='products'>
                {productsList.map((product) => (
                    <div className='product'>
                    <h1 className='productName'>{product.name}</h1>

                      <div className='image'>
                          <img src={product.imageUrl + '?alt=media'} alt={`Product ${product.id}_${product.name}`} />
                      </div>

                      <h2 className='productPrice'>{product.price}$</h2>
                      <div className='buttons'>
                          <button className='btn' onClick={() => {deleteProduct(product.id)}}>Delete This Product</button>
                          <Link to={`/product/${product.id}`}><button className='btn'>Buy It</button></Link>
                      </div>
                    </div>
                ))}
              </div>


            <div className='addProduct'>
              <h2>{t("APAddProduct")}</h2>

              <div className='productDetails'>
                  <div>
                  <label>{t("APinpName")}</label>
                  <input type='text' placeholder={t("APinpNameHolder")} onChange={(e) => setNewProductName(e.target.value)} />
                  </div>

                  <div>
                  <label>{t("APinpDescription")}</label>
                  <input type='text' placeholder={t("APinpDescriptionHolder")} onChange={(e) => setNewProductDesc(e.target.value)} />
                  </div>

                  <div>
                  <label>{t("APinpPrice")}</label>
                  <input type='number' placeholder={t("APinpPriceHolder")} onChange={(e) => setNewProductPrice(e.target.value)} />
                  </div>

                  <div>
                  <label>{t("APinpType")}</label>
                  <input type='text' placeholder={t("APinpTypeHolder")} onChange={(e) => setNewProductType(e.target.value)} />
                  </div>
                  
                  <input type='file' onChange={(e) => setImageUpload(e.target.files[0])} className='imageInp' />
              </div>

              <div className='productDetails'>
                  <div>
                  <label>{t("APinpFeature")+ " " + 1} </label>
                  <input type='text' placeholder={t("APinpFeatureHolder")+ " " + 1} onChange={(e) => setNewProductFeature1(e.target.value)} />
                  </div>

                  <div>
                  <label>{t("APinpFeature")+ " " + 2}</label>
                  <input type='text' placeholder={t("APinpFeatureHolder" + " " + 2)} onChange={(e) => setNewProductFeature2(e.target.value)} />
                  </div>

                  <div>
                  <label>{t("APinpFeature")+ " " + 3}</label>
                  <input type='text' placeholder={t("APinpFeatureHolder" + " " + 3)} onChange={(e) => setNewProductFeature3(e.target.value)} />
                  </div>
                  
              </div>


              <button className='addBtn btn' onClick={() => {
                  addProduct();
                  uploadImage();
              }}>Add Product</button>

            </div>
        </div>

            <Footer />
        </div>
    )
}

export default AdminPage;