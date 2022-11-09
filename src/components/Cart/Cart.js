import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { ProductImage } from '../ProductImage/ProductImage';
import { Price } from '../Price/Price';

import './Cart.scss';

export const Cart = memo(({ cartItems, products }) => {
    const cartProducts = useMemo(() => cartItems?.filter(id => id)?.map(id => products?.find(p => p.id === id)), [cartItems]);
    return (
        <>
            <Link to="/">Home</Link>
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
                </article>
            )}
        </>
    )
});