import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default function Cart(props) {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    
    useEffect(() => {
        getCartItems();
        getCartData();
    }, [])

    function getCartData() {
        Axios.get(`/cart/detail`, props.headers)
        .then(res => {
            setTotalPrice(res.data.cart.totalPrice)
        })
    }
    
    function getCartItems() {
        Axios.get('/cart/items', props.headers)
        .then(res => {
            // get product details
            setCartItems(res.data.cartItems);
        })
        .catch(err => {
            console.log('Error fetchin cart data');
            console.log(err);
        })
    }

    function deleteCartItem(id) {
        console.log('deleting item ' + id);
        Axios.get(`/cartitem/delete?id=${id}`, props.headers)
        .then(() => {
            getCartItems();
            getCartData();
        })
    }

    const allCartItems = cartItems.map((item, index) => (
        <div key={index}>
            <div className="cart-item d-md-flex justify-content-between"><span className="remove-item"><i onClick={() => deleteCartItem(item._id)} className="bi bi-trash"></i></span>
                    <div className="px-3 my-3">
                        <a className="cart-item-product" href="#">
                            <div className="cart-item-product-thumb"><img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Product"/></div>
                            <div className="cart-item-product-info">
                                <h4 className="cart-item-product-title">{item.product.name}</h4>
                            </div>
                        </a>
                    </div>
                    <div className="px-3 my-3 text-center">
                        <div className="cart-item-label">Quantity</div>
                        <div className="count-input">
                            <input type='number' value={item.quantity}/>
                        </div>
                    </div>
                    <div className="px-3 my-3 text-center">
                        <div className="cart-item-label">Subtotal</div><span className="text-xl font-weight-medium">BHD {item.price}</span>
                    </div>
                    <div className="px-3 my-3 text-center">
                        <div className="cart-item-label">Discount</div><span className="text-xl font-weight-medium">0</span>
                    </div>
                </div>
        </div>
    ));

    return (
        <div>
            <div className="container pb-5 mb-2 my-5">
                {allCartItems}

    <div className="d-sm-flex justify-content-between align-items-center text-center text-sm-left">
        <div className="py-2"><span className="d-inline-block align-middle text-sm font-weight-medium  mr-2">Subtotal: </span><span className="d-inline-block align-middle text-xl font-weight-medium">BHD {totalPrice}</span></div>
    </div>
    <hr className="my-2"/>
    <div className="row pt-3 pb-5 mb-2">
        <div className="col-sm-6 mb-3"><a className="btn btn-style-1 btn-primary btn-block" href="checkout-address.html"><i className="fe-icon-credit-card"></i>&nbsp;Checkout</a></div>
    </div>
    </div>
        </div>
    )
}
