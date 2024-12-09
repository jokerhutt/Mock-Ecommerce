import { useEffect, useState } from 'react';
import './Cart.css'

function Drawers ({cartStuff, cartItems, handleCartAdd, handleCartRemove, handleCartClear}) {

    return (
        <div className='shoppingCart-flex'>
                {cartStuff.map((product) => (
                <div className="cart-flex" key = {product.id}>
                    <div className="cart-image">
                        <img src={product.imageSRC}/>
                    </div>
                    <div className="cart-mid">
                        <div>
                    <h1>{product.name}</h1>
                    <p>{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                        </div>
                    <div className="cart-button">
                    <button onClick={() => handleCartAdd(product.id)}>+</button>
                    <p>{cartItems[product.id]}</p>
                    <button onClick={() => handleCartRemove(product.id)}>-</button>
                    </div>
                    </div>
                    <div className="cart-right">
                    <div className='cr-p'>
                    <p className='boldy'>
                    €{Math.round((product.price * cartItems[product.id])*100)/100}
                    </p>

                    <p>€{Math.round(product.price*100)/100}</p>
                    </div>
                    <button onClick={() => handleCartClear(product.id)}>Remove</button>
                    </div>

                </div>
                ))}
            
        </div>
    )
}

export default Drawers;