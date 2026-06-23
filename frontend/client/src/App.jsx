import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from './contexts/CartProvider';
import { CartWidgetProvider } from './contexts/CartWidgetContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminRoute } from './components/AdminRoute';
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
import Promos from './pages/admin/Promos.jsx';
import Cupones from './pages/Cupones.jsx';
import AdminCupones from './pages/admin/AdminCupones.jsx';
import OrderHistory from './pages/OrderHistory.jsx';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <CartWidgetProvider>
          <Routes>
            {}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/shop" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cupones" element={<Cupones />} />
            <Route path="/orders" element={<OrderHistory />} />

            {}
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

            {}
            <Route 
              path="/admin/promos" 
              element={
                <AdminRoute>
                  <Promos />
                </AdminRoute>
              } 
            />
            <Route 
              path="/admin/products" 
              element={
                <AdminRoute>
                  <Products />
                </AdminRoute>
              } 
            />
            <Route 
              path="/admin/inventory" 
              element={
                <AdminRoute>
                  <AdminProducts />
                </AdminRoute>
              } 
            />
            <Route 
              path="/admin/catalog" 
              element={
                <AdminRoute>
                  <CatalogConfiguration />
                </AdminRoute>
              } 
            />
            
            <Route 
              path="/admin/cupones" 
              element={
                <AdminRoute>
                  <AdminCupones />
                </AdminRoute>
              }
            />
          </Routes>
          <ConditionalCartWidget />
          <CartToggleButton />
        </CartWidgetProvider>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App