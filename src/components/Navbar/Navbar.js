import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export const Navbar = ({ logo }) => {
    return (
        <header className="Nav-header">
            <Link className="Nav-link" to="/">
                <img src={logo}
                    alt="Home Depot Logo"
                    className="Nav-logo"
                />
            </Link>
            <Link className="Nav-link" to="/products">
                Products
            </Link>
            <Link className="Cart-link" to="/cart">
                <span className="text">🛒&nbsp;&nbsp;Cart</span>
            </Link>
        </header>
    );
};
