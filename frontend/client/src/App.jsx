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
import Promos from './pages/admin/Promos.jsx';
import Cupones from './pages/admin/Cupones.jsx';
import CanjearCupones from './pages/CanjearCupones.jsx';
import PagoConfirmado from './pages/PagoConfirmado.jsx';

function App() {
  return (
    <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<Home />} />
              <Route path="/shop" element={<ProductList />} />
              <Route path="/admin/promos" element={<Promos />} />
              <Route path="/admin/cupones" element={<Cupones />} />
              <Route path="/cupones" element={<CanjearCupones />} />
              <Route path="/admin/products" element={<Products />} />
              <Route path="/admin/inventory" element={<AdminProducts />} />
              <Route path="/admin/catalog" element={<CatalogConfiguration />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/pago-confirmado" element={<PagoConfirmado />} />
            </Routes>
            <ConditionalCartWidget />
            <CartToggleButton />

    </BrowserRouter>
  )
}

export default App
