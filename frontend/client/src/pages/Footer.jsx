import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-[#050505] text-gray-400 py-16 px-6 md:px-12 border-t border-[#1A1A1A] w-full text-left">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* COLUMNA 1: LOGO Y REDES */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[#CCFF00] text-3xl font-black italic tracking-wider uppercase">
            SUPLEMENTOS PUNCHI
          </h2>
          <p className="text-sm leading-relaxed max-w-sm text-gray-400">
            Formando atletas de élite mediante suplementos respaldados por la ciencia. Llevá tu rendimiento al siguiente nivel.
          </p>
          
          {/* Iconos de Redes Sociales */}
          <div className="flex gap-4 mt-2">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#CCFF00] transition-colors text-xs font-bold uppercase tracking-wider">
              Instagram
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-[#CCFF00] transition-colors text-xs font-bold uppercase tracking-wider">
              TikTok
            </a>
            <a href="https://wa.me/tu-numero" target="_blank" rel="noreferrer" className="hover:text-[#CCFF00] transition-colors text-xs font-bold uppercase tracking-wider">
              WhatsApp
            </a>
          </div>
        </div>

        {/* COLUMNA 2: NAVEGACIÓN */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white font-black uppercase text-sm tracking-widest border-b border-[#1A1A1A] pb-2">
            Explorá
          </h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <Link to="/" className="hover:text-[#CCFF00] transition-colors">Inicio</Link>
            </li>
            <li>
              <Link to="/Shop" className="hover:text-[#CCFF00] transition-colors">Catálogo</Link>
            </li>
            <li>
              <Link to="/Shop" className="hover:text-[#CCFF00] transition-colors">Combos Destacados</Link>
            </li>
          </ul>
        </div>

        {/* COLUMNA 3: SOPORTE Y LEGALES */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white font-black uppercase text-sm tracking-widest border-b border-[#1A1A1A] pb-2">
            Soporte
          </h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <Link to="/faq" className="hover:text-[#CCFF00] transition-colors">Preguntas Frecuentes</Link>
            </li>
            <li>
              <Link to="/envios" className="hover:text-[#CCFF00] transition-colors">Políticas de Envío</Link>
            </li>
          </ul>
        </div>

      </div>

      {/* BARRA INFERIOR DE CRÉDITOS */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-[#1A1A1A] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <p>© {new Date().getFullYear()} Suplementos Punchi. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer