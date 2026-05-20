import { useNavigate } from "react-router-dom"

const ProductoCard = ({ producto }) => {

  const navigate = useNavigate()

  return (

    <div
      onClick={() => navigate(`/product/${producto.idProducto}`)}
      className="bg-[#141414] border border-[#262626] group hover:border-[#CCFF00] transition-colors cursor-pointer"
    >
      <div className="relative aspect-square overflow-hidden bg-[#1f1f1f]">

        <img
          src={producto.imagen || "https://placehold.co/600x600"}
          alt={producto.nombre}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">

          <h3 className="text-xl font-bold text-white uppercase">
            {producto.nombre}
          </h3>

          <span className="text-[#CCFF00] text-2xl font-black">
            ${producto.precio}
          </span>
        </div>

        <p className="text-gray-400 text-sm mb-6">
          {producto.descripcion}
        </p>

        <button
          onClick={(e) => e.stopPropagation()}
          className="w-full border-2 border-white/20 text-white py-3 font-bold uppercase hover:border-[#CCFF00] hover:bg-[#CCFF00] hover:text-black transition-all"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  )
}

export default ProductoCard