import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  // La función ahora vive dentro del componente y coincide con el onSubmit del form
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Te redirige a la ruta /shop usando el parámetro ?search= lo que sea
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

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
        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md mx-auto">
          <input
            type="text"
            placeholder="¿Qué estás buscando?..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#141414] text-xs text-gray-300 pl-4 pr-10 py-2.5 rounded-none border border-[#262626] focus:outline-none focus:border-[#CCFF00] transition-colors uppercase font-bold tracking-wider"
          />
          <button type="submit" className="absolute right-3 top-3 text-gray-500 hover:text-[#CCFF00] transition-colors">
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>

        {/* Columna Derecha: Iconos */}
        <div className="flex justify-end items-center gap-6">
          <button className="text-white hover:text-[#CCFF00] transition-colors text-lg">
            🛒
          </button>

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

        <NavLink to="/shop" className={navStyle}>
          Catálogo
        </NavLink>

        <NavLink to="/bundles" className={navStyle}>
          Combos
        </NavLink>

        <NavLink to="/support" className={navStyle}>
          Soporte
        </NavLink>
      </div>

    </nav>
  )
}

export default Navbar