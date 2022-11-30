import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { ProductImage } from '../ProductImage/ProductImage';
import { Price } from '../Price/Price';

import { ProductContext } from '../../context/ProductContext';
import './ProductPod.scss';

export const ProductPod = ({ product }) => {
  const setSelectedProduct = useContext(ProductContext);
  const navigate = useNavigate();

  if (!product) return null;

  const selectProduct = () => {
    setSelectedProduct(product);
    navigate("/product/" + product?.id);
  }

  return (
    <article className="product-pod">
      {/* TODO: make DRY with a ProductImage component */}
      {product.image &&
        <article className="product-image-wrapper">
          <ProductImage
            image={product.image}
          />
        </article>
      }
      {product.brand &&
        <p
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              selectProduct();
              e.target.blur();
            }
          }}
          onClick={() => selectProduct(product)}>
          <b>
            {product.brand}
          </b>
        </p>
      }
      {product.description &&
        <p
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              selectProduct();
              e.target.blur();
            }
          }}
          onClick={() => selectProduct(product)}>
          {product.description}
        </p>
      }
      <Price product={product} />
    </article>
  );
};