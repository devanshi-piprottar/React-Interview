import React, { useEffect, useState, Profiler, lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { Loading } from './components/Loading/Loading';
import { Header } from './components/Header/Header';
import { Navbar } from './components/Navbar/Navbar';

import { ProductContext } from './context/ProductContext';
import { getProducts } from './api';
import store from './redux/index';

import './App.css';

// lazy loading 
const Cart = lazy(() => import('./components/Cart/Cart'));
const ProductGrid = lazy(() => import('./components/ProductGrid/ProductGrid'));
const ProductPreview = lazy(() => import('./components/ProductPreview/ProductPreview'));

function App() {
  const [data, setData] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState({ error: false, status: "" });

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
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar logo={data?.logo} />
        </div>
        <Routes>
          <Route exact path="/" element={
            <Header text={data?.headerText} logo={data?.logo} />
          } />
          <Route exact path="/products" element={
            <Suspense fallback={<Loading />} >
              <ProductContext.Provider value={setSelectedProduct}>
                <Profiler id="ProductGrid" onRender={callback}>
                  <ProductGrid products={data?.products} />
                </Profiler>
              </ProductContext.Provider>
            </Suspense>
          } />
          <Route path="/product/:productId" element={
            <Suspense fallback={<Loading />} >
              <Profiler id="ProductPreview" onRender={callback}>
                <ProductPreview key={selectedProduct?.id} product={selectedProduct} />
              </Profiler>
            </Suspense>
          } />
          <Route path="/cart" element={
            <Suspense fallback={<Loading />} >
              <Profiler id="Cart" onRender={callback}>
                <Cart products={data?.products} />
              </Profiler>
            </Suspense>
          } />
          <Route path="*" element={
            <Navigate to="/" />
          } />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App; 
