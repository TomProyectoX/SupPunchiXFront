import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
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
import ConditionalChatbotWidget from './assets/components/react/ConditionalChatbotWidget.jsx';
import Promos from './pages/admin/Promos.jsx';
import Cupones from './pages/admin/Cupones.jsx';
import CanjearCupones from './pages/CanjearCupones.jsx';
import PagoConfirmado from './pages/PagoConfirmado.jsx';
import OrderHistory from './pages/OrderHistory.jsx';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ children }) => {
  const { token, role } = useSelector((state) => state.auth);
  return token && role === 'ADMIN' ? children : <Navigate to="/home" replace />;
};

const CustomerRoute = ({ children }) => {
  const { token, role } = useSelector((state) => state.auth);
  if (!token) return <Navigate to="/login" replace />;
  return role === 'ADMIN' ? <Navigate to="/admin/products" replace /> : children;
};

function App() {
  return (
    <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<Home />} />
              <Route path="/shop" element={<ProductList />} />
              <Route path="/admin/promos" element={<AdminRoute><Promos /></AdminRoute>} />
              <Route path="/admin/cupones" element={<AdminRoute><Cupones /></AdminRoute>} />
              <Route path="/cupones" element={<CanjearCupones />} />
              <Route path="/admin/products" element={<AdminRoute><Products /></AdminRoute>} />
              <Route path="/admin/inventory" element={<AdminRoute><AdminProducts /></AdminRoute>} />
              <Route path="/admin/catalog" element={<AdminRoute><CatalogConfiguration /></AdminRoute>} />
              <Route path="/cart" element={<CustomerRoute><Cart /></CustomerRoute>} />
              <Route path="/checkout" element={<CustomerRoute><Checkout /></CustomerRoute>} />
              <Route path="/pedidos" element={<CustomerRoute><OrderHistory /></CustomerRoute>} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/pago-confirmado" element={<PagoConfirmado />} />
            </Routes>
            <ConditionalCartWidget />
            <CartToggleButton />
            <ConditionalChatbotWidget />

    </BrowserRouter>
  )
}

export default App
