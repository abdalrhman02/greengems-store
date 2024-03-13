
import { useTranslation } from 'react-i18next';

function ProductCard({
    productCardName,
    productImage,
    productCardFirstFeature, productCardSecondFeature, productCardThirdFeature,
    productCardBtn
    }) {

    const { t, i18n } = useTranslation();

    return(
        <div className='productCard'>
            <h2 className='productName'>{productCardName}</h2>
            <img src={productImage} className='productImg' />
            
            <div className='productInfo'>
                <ul>
                    <li>
                        <i class="fa-solid fa-circle"></i>
                        {productCardFirstFeature}
                    </li>

                    <li>
                        <i class="fa-solid fa-circle"></i>
                        {productCardSecondFeature}
                    </li>

                    <li>
                        <i class="fa-solid fa-circle"></i>
                        {productCardThirdFeature}
                    </li>
                </ul>
            </div>    
        </div>
    )
}

export default ProductCard;