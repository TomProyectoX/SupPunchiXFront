import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { motion } from "framer-motion"
import { useCart } from "../hooks/useCart"
import { useCartWidget } from "../hooks/useCartWidget"
import { fetchWithAuth } from "../utils/fetchWithAuth"

const getImageSrc = (imageValue) => {
  if (!imageValue) {
    return "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/nrx/nrx02992/y/8.jpg";
  }

  if (typeof imageValue === 'object') {
    const imageFile = imageValue.file || imageValue.base64 || imageValue.data || imageValue.src || imageValue.url;

    if (typeof imageFile === 'string' && imageFile.length > 0) {
      if (imageFile.startsWith('data:')) {
        return imageFile;
      }

      if (imageFile.startsWith('http://') || imageFile.startsWith('https://')) {
        return imageFile;
      }

      return `data:image/jpeg;base64,${imageFile}`;
    }

    return "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/nrx/nrx02992/y/8.jpg";
  }

  if (imageValue.startsWith("data:")) {
    return imageValue;
  }

  if (imageValue.startsWith("http://") || imageValue.startsWith("https://")) {
    return imageValue;
  }

  return `data:image/jpeg;base64,${imageValue}`;
};

const ProductDetails = () => {

  const { id } = useParams()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const { addItem } = useCart()
  const { openCart } = useCartWidget()

  const [producto, setProducto] = useState(null)
  const [varianteSeleccionada, setVarianteSeleccionada] = useState(null)
  const [cantidad, setCantidad] = useState(1)
  const [agregado, setAgregado] = useState(false)

  useEffect(() => {
    if (!token) return;

    const cargarProducto = async () => {
      try {
        const response = await fetchWithAuth(`http://localhost:4002/productos/${id}`, {}, () => token, navigate)
        const data = await response.json()
        setProducto(data)
        if (data.variantes?.length > 0) {
          setVarianteSeleccionada(data.variantes[0])
        }
      } catch (error) {
        console.error("Error al cargar producto", error)
      }
    }

    cargarProducto();
  }, [id, token, navigate])

  const handleAddToCart = async () => {
    if (!producto) return;

    await addItem({
      idProducto: producto.idProducto,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      idSabor: varianteSeleccionada?.sabor?.idSabor,
      sabor: varianteSeleccionada?.sabor?.nombre,
      cantidad: cantidad,
    });

    setAgregado(true);
    openCart();
    setTimeout(() => setAgregado(false), 2000);
  };

  if (!producto) {
    return (
      <div className="bg-[#0A0A0A] text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#CCFF00] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-2xl font-black uppercase">Cargando...</h1>
        </div>
      </div>
    )
  }

  const tienePromo = producto.promo !== null && producto.promo !== undefined;
  const descuento = tienePromo ? Number(producto.promo.discount || 0) : 0;
  const precioOriginal = Number(producto.precio || 0);
  const precioFinal = tienePromo ? precioOriginal - (precioOriginal * descuento) / 100 : precioOriginal;

  return (
    <div className="relative bg-[#0A0A0A] text-white min-h-screen pb-24 overflow-hidden">

      {/* GLOW DE FONDO */}
      <div className="absolute top-1/3 right-0 w-[700px] h-[700px] rounded-full bg-[#CCFF00] blur-[180px] opacity-[0.06] pointer-events-none" />

      {/* BREADCRUMB */}
      <div className="relative z-20 border-b border-[#262626] fixed top-0 left-0 right-0 bg-[#0A0A0A]/95 backdrop-blur z-50 py-3">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8">
          <button 
            onClick={() => navigate(-1)}
            className="text-sm text-gray-400 hover:text-[#CCFF00] transition uppercase font-black flex items-center gap-2 group"
          >
            <span className="material-symbols-outlined text-base transition-transform group-hover:-translate-x-1">arrow_back</span>
            Volver
          </button>
        </div>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-8 py-12 pt-24">
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          
          {/* HERO IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-[#141414] to-[#050505] border border-[#262626]" style={{ aspectRatio: "1" }}>
              <img
                src={getImageSrc(producto.imagen)}
                alt={producto.nombre}
                className="w-full h-full object-contain p-8 group-hover:scale-105 transition duration-500"
                onError={(e) => {
                  e.target.src = "https://static.vecteezy.com/system/resources/previews/015/656/605/non_2x/prohibited-flat-greyscale-icon-vector.jpg";
                }}
              />
              
              {tienePromo && (
                <div className="absolute top-4 left-4 bg-[#CCFF00] text-black px-4 py-2 font-black text-sm uppercase tracking-wider rounded-full shadow-xl">
                  -{descuento}% OFF
                </div>
              )}

              <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur px-3 py-1.5 rounded-full border border-[#262626] flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${producto.disponible ? "bg-[#CCFF00]" : "bg-red-500"}`} />
                <p className="text-xs font-bold uppercase text-[#CCFF00]">
                  {producto.disponible ? "En Stock" : "Agotado"}
                </p>
              </div>
            </div>
          </motion.div>

          {/* PRODUCT INFO */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-between"
          >
            
            <div className="space-y-6">
              
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs font-black uppercase bg-[#CCFF00] text-black px-3 py-1 rounded-full">
                  {producto.categoria?.description || "Elite"}
                </span>
                <span className="text-xs font-bold uppercase text-gray-500">
                  {producto.marca?.nombre || "Premium"}
                </span>
              </div>

              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-[1.05] tracking-tight italic">
                  {producto.nombre}
                </h1>
              </div>

              <div className="flex items-baseline gap-4">
                <span className="text-4xl sm:text-5xl font-black text-[#CCFF00]">
                  ${precioFinal.toLocaleString('es-AR')}
                </span>
                {tienePromo && (
                  <span className="text-xl text-gray-500 line-through">
                    ${precioOriginal.toLocaleString('es-AR')}
                  </span>
                )}
              </div>

              <p className="text-base text-gray-400 leading-relaxed max-w-md">
                {producto.descripcion}
              </p>

              {producto.tamano && (
                <div className="border-t border-[#262626] pt-6">
                  <p className="text-xs font-bold uppercase text-gray-500 mb-2">Tamaño</p>
                  <p className="text-xl font-black text-[#CCFF00]">{producto.tamano}</p>
                </div>
              )}

              {producto.variantes?.length > 0 && (
                <div className="border-t border-[#262626] pt-6">
                  <h3 className="text-sm font-black uppercase mb-4 text-[#CCFF00]">Selecciona tu Sabor</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {producto.variantes.map((variante) => (
                      <button
                        key={variante.id}
                        onClick={() => setVarianteSeleccionada(variante)}
                        className={`py-3 px-3 rounded-xl border font-bold uppercase text-xs transition-all hover:-translate-y-0.5 ${
                          varianteSeleccionada?.id === variante.id
                            ? "border-[#CCFF00] bg-[#CCFF00]/10 text-[#CCFF00]"
                            : "border-[#262626] text-gray-300 hover:border-[#CCFF00]/50 hover:text-[#CCFF00]"
                        }`}
                      >
                        {variante.sabor?.nombre}
                        <p className="text-[9px] text-gray-500 mt-1 font-medium">Stock: {variante.stock}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t border-[#262626] pt-6">
                <p className="text-xs font-bold uppercase text-gray-500 mb-3">Cantidad</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-[#050505] border border-[#262626] rounded-xl overflow-hidden">
                    <button
                      onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                      className="px-4 py-3 text-[#CCFF00] font-black hover:bg-[#CCFF00]/10 transition"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={varianteSeleccionada?.stock || 999}
                      value={cantidad}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 1;
                        const maxStock = varianteSeleccionada?.stock || 999;
                        setCantidad(Math.min(Math.max(1, val), maxStock));
                      }}
                      className="w-14 text-center bg-transparent text-white font-black border-none outline-none"
                    />
                    <button
                      onClick={() => {
                        const maxStock = varianteSeleccionada?.stock || 999;
                        setCantidad(Math.min(cantidad + 1, maxStock));
                      }}
                      className="px-4 py-3 text-[#CCFF00] font-black hover:bg-[#CCFF00]/10 transition"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    disabled={!producto.disponible || !varianteSeleccionada}
                    className={`flex-1 py-3.5 px-6 font-black uppercase text-xs rounded-xl transition-all hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 ${
                      agregado
                        ? "bg-green-500 text-black shadow-lg shadow-green-500/40"
                        : producto.disponible && varianteSeleccionada
                        ? "bg-[#CCFF00] text-black hover:bg-white shadow-lg shadow-[#CCFF00]/40"
                        : "bg-gray-700 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {agregado ? (
                      <>
                        <span className="material-symbols-outlined text-base">check</span>
                        Añadido
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-base">shopping_bag</span>
                        Añadir
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">Stock disponible: {varianteSeleccionada?.stock || 0}</p>
              </div>
            </div>

            {/* FEATURES */}
            <div className="grid grid-cols-2 gap-4 my-8 py-8 border-y border-[#262626]">
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase font-bold">Disponibilidad</p>
                <p className="font-black text-[#CCFF00]">{producto.disponible ? "En Stock" : "Agotado"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase font-bold">Categoría</p>
                <p className="font-black uppercase">{producto.categoria?.description || "N/A"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase font-bold">Marca</p>
                <p className="font-black uppercase">{producto.marca?.nombre || "N/A"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase font-bold">ID Producto</p>
                <p className="font-black">{producto.idProducto}</p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  )
}

export default ProductDetails