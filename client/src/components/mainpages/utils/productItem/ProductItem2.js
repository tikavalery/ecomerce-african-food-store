import React from 'react'
import BtnRender from './BtnRender'
import "./ProductItem2.css"

function ProductItem2({product, isAdmin, deleteProduct, handleCheck,pagename}) {

    return (
        
     

      <div className={pagename==="related"? "product_card_related" : "product_card"}>
      
             {
                isAdmin && <input type="checkbox" checked={product.checked}
                onChange={() => handleCheck(product._id)} />
            }
          <img src={product.images.url} alt="Denim Jeans" className={pagename ==="related"? "product_card_img_related":'product_card_img'}/>
          <h4 title={product.title} className ="product-title">{product.title}</h4>
          <p className="price"> $ {product.price}</p>
        
          <BtnRender product={product} deleteProduct={deleteProduct} />
      
         
          </div>
            
           
       
    )
}

export default ProductItem2