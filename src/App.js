import React, { useEffect, useState, Profiler } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { Cart } from './components/Cart/Cart';
import { Header } from './components/Header/Header';
import { ProductGrid } from './components/ProductGrid/ProductGrid';
import { ProductPreview } from './components/ProductPreview/ProductPreview';

import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { ProductContext } from './context/ProductContext';
import { CartContext } from './context/CartContext';
import { getProducts } from './api';

import './App.css';

function App() {
  const [data, setData] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState({ error: false, status: "" });
  const addToCart = (id) => {
    if (cartItems?.indexOf(id) === -1) {
      setCartItems([...cartItems, id]);
    }
  }

  useEffect(() => {
    // Fn To Fetch Product Data From API
    async function fetchProductData() {
      try {
        const result = await getProducts();
        setData(result);
      }
      catch (e) {
        setError({ error: e.message, status: e.status });
      }
    }

    fetchProductData();
  }, []);

  const callback = (id, phase, actualDuration, startTime,
    baseDuration, commitTime, interactions) => {
    console.log(
      "id " + id +
      " startTime " + startTime +
      " actualDuration " + actualDuration +
      " baseDuration " + baseDuration +
      " commitTime " + commitTime +
      " phase " + phase +
      " interactions " + interactions
    );
  }
  return (
    <ErrorBoundary>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={
              <>
                <Profiler id="Header" onRender={callback}>
                  <Header text={data?.headerText} />
                </Profiler>
                <ProductContext.Provider value={setSelectedProduct}>
                  <Profiler id="ProductGrid" onRender={callback}>
                    <ProductGrid products={data?.products} />
                  </Profiler>
                </ProductContext.Provider>
              </>
            } />
            <Route path="/product/:productId" element={
              <CartContext.Provider value={addToCart}>
                <Profiler id="ProductPreview" onRender={callback}>
                  <ProductPreview key={selectedProduct?.id} product={selectedProduct} />
                </Profiler>
              </CartContext.Provider>
            } />
            <Route path="/cart" element={
              <Profiler id="Cart" onRender={callback}>
                <Cart cartItems={cartItems} products={data?.products} />
              </Profiler>
            } />
            <Route path="*" element={
              <Navigate to="/" />
            } />
          </Routes>
        </Router>
      </div>
    </ErrorBoundary >
  );
}

export default App; 
