import React from 'react';
import './Overlay.css';

export const Overlay = ({ image, closeOverlay }) => {
    return (
        <article className="overlay">
            <a className="closeBtn" onClick={closeOverlay}>&times;</a>
            <img
                src={image}
                alt="Home Depot logo"
                className="image"
            />
        </article>
    )
};