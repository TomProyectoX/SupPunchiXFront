import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    // min-h-[85vh] define la altura total. items-center centra verticalmente todo el contenido.
    <section className="relative min-h-[85vh] flex items-center pt-10 bg-[#0a0a0a] overflow-hidden px-6 md:px-16 lg:px-24">
      
      {/* Contenedor de la Imagen - Ahora con transform para un sutil efecto "zoom" */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://pxcdn.0223.com.ar/f/062018/1528408155979.webp?cw=748&ch=420&extw=jpg"
          alt="Suplementos Deportivos"
          className="w-full h-full object-cover object-center opacity-40 mix-blend-screen scale-105"
        />
        {/* Degradados para que el texto resalte sobre la imagen */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent"></div>
      </div>

      {/* Contenido Principal - Centrado verticalmente gracias al flex del padre */}
      <div className="relative z-10 max-w-3xl text-left">
        
        <span className="inline-block px-3 py-1 bg-[#CCFF00] text-black text-[10px] font-black uppercase mt-10">
          Nuevos Ingresos
        </span>

        <h1 className="text-white text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
          Rompe tus <br />
          <span className="text-[#CCFF00] italic">Limites</span>
        </h1>

        <p className="text-gray-400 text-base md:text-lg max-w-md font-medium leading-relaxed mb-8">
          La ciencia aplicada al máximo rendimiento. Descubrí los suplementos importados que están cambiando el juego.
        </p>

        <div className="flex gap-4">
          <Link to="/shop">
            <button className="bg-[#CCFF00] text-black px-10 py-4 text-xs font-black uppercase tracking-[0.2em] hover:bg-white transition-all duration-300">
              Ver Productos
            </button>
          </Link>
        </div>
      </div>

      {/* Línea decorativa inferior */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#CCFF00] to-transparent"></div>
    </section>
  );
};

export default Hero;