import React, { useState } from 'react';
import { connect } from 'react-redux';

import { ProductImage } from '../ProductImage/ProductImage';
import { Price } from '../Price/Price';

import { addToCart } from '../../redux/cart/CartDispatcher';

import './ProductPreview.scss';

const ProductPreview = (props) => {
  const [quantity, setQuantity] = useState(1);
  const { product } = props;
  return (
    <>
      {product &&
        <article className="product-preview">
          {/* TODO: make DRY with a ProductImage component */}
          {product.image &&
            <article className="product-image-wrapper">
              <ProductImage
                image={product.image}
              />
            </article>
          }
          <aside className="product-preview-details">
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
            <article>
              <input type="number" className="quantity" min="1" step="1"
                value={quantity} onChange={(e) => setQuantity(e.target.value)} />
              <button
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    addToCart(product.id);
                    e.target.blur();
                  }
                }}
                onClick={() => props.addToCart({ id: product.id, quantity: quantity })}
              >
                Add to Cart
              </button>
            </article>
          </aside>
        </article>
      }
    </>
  )
};

const mapDispatchToProps = dispatch => ({
  addToCart: (id, quantity) => dispatch(addToCart(id, quantity)),
});

export default connect(
  null,
  mapDispatchToProps,
)(ProductPreview);