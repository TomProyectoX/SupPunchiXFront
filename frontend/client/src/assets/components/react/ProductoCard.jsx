import { useEffect, useState } from "react";

const ProductoCard = ({ producto, view }) => {
  const [imagenBase64, setImagenBase64] = useState(null);

  if (!producto) return null;

  const isGrid = view === "grid";

  useEffect(() => {
    if (producto.imagen) {
      fetch(`http://localhost:4002/images?id=${producto.imagen}`)
        .then((res) => {
          if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
          return res.json();
        })
        .then((data) => {
          if (data && data.file) {
            setImagenBase64(data.file);
          }
        })
        .catch((err) => {
          console.error(`Error cargando imagen del producto ${producto.nombre}:`, err);
        });
    }
  }, [producto.imagen]);

  const imageSrc = imagenBase64
    ? `data:image/avif;base64,${imagenBase64}`
    : "";

  return (
    <div 
      className={`bg-[#111111] border border-[#262626] rounded-xl overflow-hidden flex hover:border-gray-700 transition-all text-left w-full
        ${isGrid ? "flex-col h-auto" : "flex-row h-[155px]"}`} 
    >
      
      {/* Contenedor de Imagen */}
      <div className={`bg-white p-4 flex items-center justify-center relative shrink-0
        ${isGrid ? "w-full h-48" : "w-[30%] h-full"}`}
      >
        <span className="absolute top-2 left-2 bg-[#CCFF00] text-black text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider z-10">
          🚚 Gratis
        </span>
        <img
          src={imageSrc}
          alt={producto.nombre}
          className="max-h-full max-w-full object-contain"
          onError={(e) => {
            e.target.src = "https://static.vecteezy.com/system/resources/previews/015/656/605/non_2x/prohibited-flat-greyscale-icon-vector.jpg";
          }}
        />
      </div>

      {/* Contenedor de Textos */}
      <div className={`p-4 flex flex-col justify-between bg-[#111111] flex-grow
        ${isGrid ? "gap-3" : "h-full w-[70%]"}`}
      >
        <div>
          <h3 className="text-white font-black text-xs uppercase tracking-wide line-clamp-2 leading-tight min-h-[32px]">
            {producto.nombre}
          </h3>
          
          <p className="text-white text-base font-black mt-1">
            ${Number(producto.precio || 0).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
          </p>

          <div className="bg-[#CCFF00] text-black text-[8px] font-black px-1.5 py-0.5 rounded mt-1.5 inline-block uppercase tracking-wider whitespace-nowrap">
            ${Math.round((producto.precio || 0) * 0.85).toLocaleString('es-AR')} POR TRANSFERENCIA
          </div>
        </div>

        <div>
          <div className="text-[10px] text-gray-400 leading-tight mb-2">
            <p>En <span className="font-bold text-white">6 cuotas sin interés</span> de ${Math.round((producto.precio || 0) / 6).toLocaleString('es-AR')}</p>
          </div>

          <button className="w-full bg-[#CCFF00] hover:bg-[#bce500] text-black text-xs font-black uppercase py-2 rounded transition-colors tracking-wider">
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductoCard;