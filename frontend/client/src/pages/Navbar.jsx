import { useState } from "react"
import { NavLink } from "react-router-dom"
import SearchBar from "../assets/components/react/SearchBar"

const Navbar = () => {
  const navStyle = ({ isActive }) =>
    isActive
      ? "text-[#CCFF00] border-b-2 border-[#CCFF00] font-black py-1 text-xs uppercase tracking-widest transition-all"
      : "text-white hover:text-[#CCFF00] transition-colors py-1 text-xs uppercase tracking-widest font-black"

  return (
    <nav className="bg-[#0A0A0A] w-full border-b border-[#262626] flex flex-col px-6 md:px-12 py-4">
      
      {/* FILA 1: Logo a la izq, Buscador al centro, Iconos a la der */}
      <div className="grid grid-cols-3 items-center w-full">
        
        {/* Columna Izquierda: Logo */}
        <div className="flex justify-start">
          <NavLink
            to="/"
            className="text-xl md:text-2xl font-black text-[#CCFF00] italic tracking-tighter uppercase whitespace-nowrap"
          >
            Suplementos Punchi
          </NavLink>
        </div>

        {/* Columna Central: Buscador Centrado */}
        <SearchBar />

        {/* Columna Derecha: Iconos */}
        <div className="flex justify-end items-center gap-6">
          <NavLink
            to="/cart"
            className="text-white hover:text-[#CCFF00] transition-colors text-lg"
          >
            🛒
          </NavLink>

          <NavLink
            to="/login"
            className="text-white hover:text-[#CCFF00] transition-colors text-lg"
          >
            👤
          </NavLink>
        </div>

      </div>

      {/* FILA 2: Menú de Navegación Abajo */}
      <div className="hidden md:flex items-center justify-center gap-8 w-full mt-4 pt-3 border-t border-[#262626]/40">
        <NavLink to="/" className={navStyle}>
          Inicio
        </NavLink>

        <NavLink to="/Shop" className={navStyle}>
          Catálogo
        </NavLink>

      </div>

    </nav>
  )
}

export default Navbar