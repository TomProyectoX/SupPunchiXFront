import { useState } from "react"
import { useNavigate } from "react-router-dom"

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Redirige a la página de productos con parámetro de búsqueda
      navigate(`/Shop?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
      setIsOpen(false)
    }
  }

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleClearSearch = () => {
    setSearchQuery("")
  }

  return (
    <form 
      onSubmit={handleSearchSubmit} 
      className="relative w-full max-w-md mx-auto"
    >
      <div className="relative">
        <input
          type="text"
          placeholder="¿Qué estás buscando?..."
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          className="w-full bg-[#141414] text-xs text-white pl-4 pr-10 py-2.5 rounded-none border border-[#262626] focus:outline-none focus:border-[#CCFF00] transition-colors uppercase font-black placeholder-gray-500"
        />
        
        {/* Botón Limpiar (visible si hay texto) */}
        {searchQuery && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#CCFF00] transition-colors"
          >
            ✕
          </button>
        )}

        {/* Botón Buscar */}
        <button 
          type="submit" 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#CCFF00] transition-colors"
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </button>
      </div>
    </form>
  )
}

export default SearchBar