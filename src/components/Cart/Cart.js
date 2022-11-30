import React, { memo } from 'react';
import { connect } from 'react-redux';
import { FaTrash } from 'react-icons/fa';

import { ProductImage } from '../ProductImage/ProductImage';
import { Price } from '../Price/Price';

import { updateCart, deleteFromCart } from '../../redux/cart/CartDispatcher';

import './Cart.scss';

const Cart = (props) => {
    const cartProducts = props.cartItems?.map(item => ({ ...props.products?.find(p => p.id === item.id), quantity: item.quantity }));
    const updateQuantity = (e, id) => {
        const quantity = e.target.value;
        if (quantity > 0) {
            props.updateCart({ id: id, quantity: quantity });
        }
    }

    return (
        <>
            {cartProducts?.map(product =>
                <article className="cart" key={product?.id}>
                    {/* TODO: make DRY with a ProductImage component */}
                    {product.image &&
                        <article className="product-image-wrapper">
                            <ProductImage
                                image={product.image}
                            />
                        </article>
                    }
                    <aside className="cart-details">
                        {product.brand &&
                            <p>
                                <b>
                                    {product.brand}
                                </b>
                            </p>
                        }
                        {product.description &&
                            <p>
                                {product.description}
                            </p>
                        }
                        <article className="product-price-wrapper">
                            <Price product={product} showSpecialPrice />
                        </article>
                    </aside>
                    <aside>
                        <input type="number" min="1" step="1" className="quantity"
                            value={product.quantity} onChange={(e) => updateQuantity(e, product.id)} />
                        <FaTrash style={{color: "#353935"}}
                            onClick={() => props.deleteFromCart({ id: product.id, quantity: product.quantity })} />
                    </aside>
                </article>
            )}
        </>
    )
};

const mapStateToProps = state => ({
    cartItems: state.cart?.cartItems,
});

const mapDispatchToProps = dispatch => ({
    updateCart: (id, quantity) => dispatch(updateCart(id, quantity)),
    deleteFromCart: (id, quantity) => dispatch(deleteFromCart(id, quantity)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Cart);