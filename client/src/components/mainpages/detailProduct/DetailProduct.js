import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import ProductItem2 from '../utils/productItem/ProductItem2'


function DetailProduct() {
    const params = useParams()
    console.log(params.id)
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const addCart = state.userAPI.addCart
    const [detailProduct, setDetailProduct] = useState([])
    const pagename = "related"

    console.log(state)
    useEffect(() =>{
        if(params.id){

            products.forEach(product => {
                if(product._id === params.id) setDetailProduct(product)
            })
        }
    },[params.id, products])

    if(detailProduct.length === 0) return null;

    return (
        <>
            <div className='details-container'>
            <div className="detail">
                <img src={detailProduct.images.url} alt="" />
                <div className="box-detail">
                    <div className="row">
                        <h1>{detailProduct.title}</h1>
                        <h6>#id: {detailProduct.product_id}</h6>
                        </div>
                        <div className="price-promotion">
                            <h2 className='price-promotion-title'>$ {detailProduct.price}</h2>
                            <span className='price-promotion-promotion'> 70% off</span>
                        </div>
                    
                    <p>{detailProduct.description}</p>
                    <p>{detailProduct.content}</p>
                    <p>Sold: {detailProduct.sold}</p>
                    <Link to="/cart" className="detailed-card-button"
                    onClick={() => addCart(detailProduct)}>
                       ADD TO CART
                    </Link>
                </div>
            </div>

            <div className='related-products'>
                <h2 className='related-products-title'>Related products</h2>
                <div className="related-products-products">
                    {
                        products.map(product => {
                            return product.category === detailProduct.category 
                                ? <ProductItem2 key={product._id} product={product} pagename = {pagename} /> : null
                        })
                    }
                </div>
            </div>

            </div>
            
        </>
    )
}

export default DetailProduct
