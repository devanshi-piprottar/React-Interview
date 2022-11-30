import React, { useState } from 'react';
import { Overlay } from '../Overlay/Overlay';
import './ProductImage.css';

export const ProductImage = ({ image }) => {
    const [showOverlay, setShowOverlay] = useState(false);
    return (
        <>
            <article className="product-image">
                <img
                    src={image}
                    alt="Home Depot logo"
                    className="image"
                    role="button"
                    tabIndex={0}
                    onClick={() => setShowOverlay(true)}
                />
            </article>
            {showOverlay && <Overlay image={image} closeOverlay={() => setShowOverlay(false)} />}
        </>
    )
};