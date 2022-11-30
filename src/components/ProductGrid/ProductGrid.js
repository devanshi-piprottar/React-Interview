import React from 'react';
import { ProductPod } from '../ProductPod/ProductPod';
import './ProductGrid.scss';

const ProductGrid = ({ products }) => {
  if (!products?.length) return null;
  
  return (
    <article className="product-grid">
      {/* TODO: Render a ProductPod for each product */}
      {products?.map((product) =>
        <article className="product-pod-wrapper" key={product?.id}>
          <ProductPod product={product} />
        </article>
      )}
    </article>
  );
};

export default ProductGrid;