import { NavLink } from "react-router-dom"
import SearchBar from "../assets/components/react/SearchBar"

const Navbar = () => {
  const navStyle = ({ isActive }) =>
    isActive
      ? "text-[#CCFF00] border-b-2 border-[#CCFF00] font-black py-1 text-xs uppercase tracking-widest transition-all"
      : "text-white hover:text-[#CCFF00] transition-colors py-1 text-xs uppercase tracking-widest font-black"

  return (
    <nav className="bg-[#0A0A0A] w-full border-b border-[#262626] px-6 md:px-12 py-4">
      
      {/* Contenedor principal tipo Grid para alinear logo/enlaces, buscador y botones */}
      <div className="grid grid-cols-[1fr_2fr_1fr] items-center gap-6 w-full max-w-[1400px] mx-auto">
        
        {/* IZQUIERDA: Logo + Enlaces */}
        <div className="flex items-center gap-8 justify-start">
          <NavLink to="/" className="text-xl md:text-2xl font-black text-[#CCFF00] italic tracking-tighter uppercase whitespace-nowrap">
            Punchis.
          </NavLink>
          
          <div className="hidden md:flex gap-6">
            <NavLink to="/" className={navStyle}>Inicio</NavLink>
            <NavLink to="/shop" className={navStyle}>Catálogo</NavLink>
          </div>
        </div>

        {/* CENTRO: Buscador Centrado */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-sm">
            <SearchBar />
          </div>
        </div>

        {/* DERECHA: Iconos (Carrito primero, luego Login) */}
        <div className="flex justify-end items-center gap-6">
          
          {/* Carrito */}
          <NavLink to="/cart" className="text-white hover:text-[#CCFF00] transition-colors relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <span className="absolute -top-2 -right-2 bg-[#CCFF00] text-black text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full">0</span>
          </NavLink>

          {/* Login */}
          <NavLink to="/login" className="text-white hover:text-[#CCFF00] transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </NavLink>

        </div>

      </div>
    </nav>
  )
}

export default Navbar