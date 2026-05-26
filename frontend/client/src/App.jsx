import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartProvider';
import { CartWidgetProvider } from './contexts/CartWidgetContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import ProductList from './pages/ProductList.jsx';
import AdminProducts from './pages/admin/AdminProducts.jsx';
import Products from './pages/admin/Products.jsx';
import CatalogConfiguration from './pages/admin/CatalogConfiguration.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import ConditionalCartWidget from './assets/components/react/ConditionalCartWidget.jsx';
import CartToggleButton from './assets/components/react/CartToggleButton.jsx';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <CartWidgetProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/home" 
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/shop" 
                element={
                  <ProtectedRoute>
                    <ProductList />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/products" 
                element={
                  <ProtectedRoute>
                    <Products />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/inventory" 
                element={
                  <ProtectedRoute>
                    <AdminProducts />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/catalog" 
                element={
                  <ProtectedRoute>
                    <CatalogConfiguration />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/cart" 
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                } 
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/product/:id"
                element={
                  <ProtectedRoute>
                    <ProductDetails />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <ConditionalCartWidget />
            <CartToggleButton />
          </CartWidgetProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
