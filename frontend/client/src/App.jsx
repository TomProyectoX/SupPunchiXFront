import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Home from "./pages/Home.jsx";
import ProductList from './pages/ProductList.jsx';
import AdminProducts from './pages/admin/AdminProducts.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/admin/products" element={<AdminProducts />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
