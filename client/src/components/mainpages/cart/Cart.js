import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import PaypalButton from './PaypalButton'

function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
    const [total, setTotal] = useState(0)

    useEffect(() =>{
        const getTotal = () =>{
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            },0)

            setTotal(total)
        }

        getTotal()

    },[cart])

    const addToCart = async (cart) =>{
        await axios.patch('/user/addcart', {cart}, {
            headers: {Authorization: token}
        })
    }


    const increment = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity += 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const decrement = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const removeProduct = id =>{
        if(window.confirm("Do you want to delete this product?")){
            cart.forEach((item, index) => {
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })

            setCart([...cart])
            addToCart(cart)
        }
    }

    const tranSuccess = async (payment) => {
        console.log(payment)
        const {paymentID, address} = payment;

        await axios.post('/api/payment', {cart, paymentID, address}, {
            headers: {Authorization: token}
        })

        setCart([])
        addToCart([])
        alert("You have successfully placed an order.")
    }


    if(cart.length === 0) 
        return <h2 style={{textAlign: "center", fontSize: "5rem"}}>Cart Empty</h2> 

    return (
        <div>
            {
                cart.map(product => (
                    <div className="cart" key={product._id}>
                        <div className="cart-image-div">
                            <img className='cart-image-image' src={product.images.url} alt="" />
                        </div>
                        <div className="cart-description-box">
                            <h2 className='cart-description-box-title'>{product.title}</h2>
                        
                        </div>
                        <div className="cart-quantity">
                              <button className='cart-quantity-minus' onClick={() => decrement(product._id)}> - </button>
                                <span className='cart-quantity-quantity'>{product.quantity}</span>
                                <button className='cart-quantity-add' onClick={() => increment(product._id)} > + </button>
                        </div>
                        <div className="cart-price">
                            <h3 className='cart-price-actual'>$ {product.price * product.quantity}</h3>
                        </div>
                        <div className="cart-delete" >
                            <button className='cart-delete-button' onClick={() => removeProduct(product._id)}>Remove</button>
                               
                            </div>
                
                    </div>
                ))
            }

            <div className="total">
                <h3 className='total-quantity'>Total: $ {total}</h3>
                <PaypalButton className="total-paypal" total={total} tranSuccess={tranSuccess} />
            </div>
        </div>
    )
}

export default Cart
