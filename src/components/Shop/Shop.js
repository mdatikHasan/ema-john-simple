import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    let sum = 0;
    for (const product of cart) {
        sum = sum + product.price;
    }

    const shippingCharge = (sum * 1) / 100;
    const tax = (sum * 5) / 100;

    const grandTotal = sum + shippingCharge + tax;

    const clearCart = cart => {
        setCart([])
    }


    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    const handleAddToCart = (product) => {
        const newCart = [...cart, product]
        setCart(newCart)
        // console.log(newCart);
    }
    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    products.map(product => <Product handleAddToCart={handleAddToCart} product={product} key={product.id}></Product>)
                }
            </div>
            <div className="cart-container">
                <p>Selected Item: {cart.length}</p>

                <p>Total Price: ${sum}</p>
                <p>Shipping Charge: ${shippingCharge}</p>
                <p>Tax: ${tax}</p>
                <h3>Grand Total: ${grandTotal}</h3>
                <button onClick={() => clearCart(cart)}>Clear Cart</button>
            </div>
        </div>
    );
};

export default Shop;