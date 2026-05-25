import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import ProductList from './pages/ProductList.jsx';
import AdminProducts from './pages/admin/AdminProducts.jsx';
import Products from './pages/admin/Products.jsx';
import ProductDetails from './assets/components/react/ProductDetails.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/inventory" element={<AdminProducts />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
