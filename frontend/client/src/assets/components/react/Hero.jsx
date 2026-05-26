import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    // CAMBIO AQUÍ: Cambiamos pt-20 por pt-8 para eliminar el aire excesivo de arriba, 
    // y usamos flex items-center para que todo se centre verticalmente de forma equilibrada.
    <section className="relative min-h-[85vh] md:min-h-[calc(100vh-135px)] flex items-center bg-[#0a0a0a] overflow-hidden pt-8 pb-12 px-6 md:px-16 lg:px-24">
      
      {/* Contenedor de la Imagen de Fondo (Atleta/Suplementos) */}
      <div className="absolute inset-0 z-0 flex justify-end">
        <div className="relative w-full md:w-2/3 h-full">
          <img
            src="https://pxcdn.0223.com.ar/f/062018/1528408155979.webp?cw=748&ch=420&extw=jpg"
            alt="Suplementos Deportivos"
            className="w-full h-full object-cover object-center md:object-right opacity-30 md:opacity-50 mix-blend-screen"
          />
          {/* Degradados para fundir la imagen con el fondo negro de la página */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
        </div>
      </div>

      {/* Contenido Principal (Alineado a la izquierda) */}
      {/* CAMBIO AQUÍ: Le agregamos un mt-[-20px] sutil solo en pantallas grandes para compensar visualmente el peso del Navbar */}
      <div className="relative z-10 max-w-3xl text-left md:-mt-6">
        
        {/* Badge "Nuevos Ingresos" */}
        <span className="inline-block px-2 py-1 bg-[#CCFF00] text-black text-xs font-black tracking-wider uppercase mb-4">
          Nuevos Ingresos
        </span>

        {/* Título Principal */}
        <h1 className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.95]">
          Rompe tus <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            Limites
          </span>
        </h1>

        {/* Descripción corta */}
        <p className="text-gray-400 text-base md:text-lg mt-6 max-w-xl font-medium leading-relaxed">
          La ciencia aplicada al máximo rendimiento. Descubrí los suplementos importados que están cambiando el juego.
        </p>

        {/* Botones de Acción */}
        <div className="flex flex-wrap gap-4 mt-8">
          <Link to="/Shop">
            <button className="bg-[#CCFF00] text-black px-8 py-3.5 text-sm font-extrabold uppercase tracking-wider hover:bg-[#b2df00] transition-colors duration-300">
              Ver Catálogo
            </button>
          </Link>

          <Link to="/combos">
            <button className="border-2 border-white text-white px-8 py-3.5 text-sm font-extrabold uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300">
              Combos Pro
            </button>
          </Link>
        </div>

      </div>

      {/* Detalle decorativo sutil */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#CCFF00]/30 to-transparent"></div>
    </section>
  );
};

export default Hero;