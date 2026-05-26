import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useCart } from "../hooks/useCart"
import { useCartWidget } from "../hooks/useCartWidget"
import { fetchWithAuth } from "../utils/fetchWithAuth"

const ProductDetails = () => {

  const { id } = useParams()
  const navigate = useNavigate()
  const { token } = useAuth()
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
    

    try {
        const payload = {
                idproducto: producto.idProducto,
                idsabor: varianteSeleccionada.sabor.idSabor,
                cantidad: cantidad
                }
        const response = await  fetchWithAuth(`http://localhost:4002/carritos`, {
             method: "POST",
             body: JSON.stringify(payload)
        }, () => token, navigate)

        if (!response.ok){
            throw new Error 
        }
        addItem({
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

        
    } catch (error) {
        console.log(error)
    }




    
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
    <div className="bg-[#0A0A0A] text-white min-h-screen pb-24">
      {/* BREADCRUMB */}
      <div className="border-b border-[#262626] fixed top-0 left-0 right-0 bg-[#0A0A0A]/95 backdrop-blur z-50 py-3">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8">
          <button 
            onClick={() => navigate(-1)}
            className="text-sm text-gray-400 hover:text-[#CCFF00] transition uppercase font-semibold flex items-center gap-2"
          >
            ← Volver
          </button>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 py-12 pt-24">
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          
          {/* HERO IMAGE */}
          <div className="flex flex-col gap-6">
            {/* MAIN IMAGE */}
            <div className="relative group overflow-hidden rounded-xl bg-gradient-to-br from-[#141414] to-[#050505] border border-[#262626]" style={{ aspectRatio: "1" }}>
              <img
                src={producto.imagen || "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/nrx/nrx02992/y/8.jpg"}
                alt={producto.nombre}
                className="w-full h-full object-contain p-8 group-hover:scale-105 transition duration-500"
                onError={(e) => {
                  e.target.src = "https://static.vecteezy.com/system/resources/previews/015/656/605/non_2x/prohibited-flat-greyscale-icon-vector.jpg";
                }}
              />
              
              {/* PROMO BADGE */}
              {tienePromo && (
                <div className="absolute top-4 left-4 bg-[#CCFF00] text-black px-4 py-2 font-black text-sm uppercase tracking-wider rounded-lg shadow-xl">
                  -{descuento}% OFF
                </div>
              )}

              {/* STOCK INDICATOR */}
              <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur px-3 py-1 rounded-lg border border-[#262626]">
                <p className="text-xs font-bold uppercase text-[#CCFF00]">
                  {producto.disponible ? "✓ En Stock" : "Agotado"}
                </p>
              </div>
            </div>

            {/* THUMBNAIL INDICATORS - REMOVED, NOW IN PRODUCT INFO */}
          </div>

          {/* PRODUCT INFO */}
          <div className="flex flex-col justify-between">
            
            {/* TOP INFO */}
            <div className="space-y-6">
              
              {/* META */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs font-black uppercase bg-[#CCFF00] text-black px-3 py-1 rounded-lg">
                  {producto.categoria?.description || "Elite"}
                </span>
                <span className="text-xs font-bold uppercase text-gray-500">
                  {producto.marca?.nombre || "Premium"}
                </span>
              </div>

              {/* TITLE */}
              <div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase leading-[1.1] tracking-tight">
                  {producto.nombre}
                </h1>
              </div>

              {/* PRICE */}
              <div className="flex items-baseline gap-4">
                <span className="text-5xl sm:text-6xl font-black text-[#CCFF00]">
                  ${precioFinal.toLocaleString('es-AR')}
                </span>
                {tienePromo && (
                  <span className="text-2xl text-gray-500 line-through">
                    ${precioOriginal.toLocaleString('es-AR')}
                  </span>
                )}
              </div>

              {/* DESCRIPTION */}
              <p className="text-lg text-gray-300 leading-relaxed max-w-md">
                {producto.descripcion}
              </p>

              {/* SIZE INFO */}
              {producto.tamano && (
                <div className="border-t border-[#262626] pt-6">
                  <p className="text-xs font-bold uppercase text-gray-400 mb-2">Tamaño</p>
                  <p className="text-xl font-black text-[#CCFF00]">{producto.tamano}</p>
                </div>
              )}

              {/* FLAVORS SELECTION */}
              {producto.variantes?.length > 0 && (
                <div className="border-t border-[#262626] pt-6">
                  <h3 className="text-sm font-black uppercase mb-4 text-[#CCFF00]">Selecciona tu Sabor</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {producto.variantes.map((variante) => (
                      <button
                        key={variante.id}
                        onClick={() => setVarianteSeleccionada(variante)}
                        className={`py-3 px-3 rounded-lg border-2 font-bold uppercase text-xs transition transform hover:scale-105 ${
                          varianteSeleccionada?.id === variante.id
                            ? "border-[#CCFF00] bg-[#CCFF00]/10 text-[#CCFF00]"
                            : "border-[#262626] text-gray-300 hover:border-[#CCFF00] hover:text-[#CCFF00]"
                        }`}
                      >
                        {variante.sabor?.nombre}
                        <p className="text-[9px] text-gray-400 mt-1">Stock: {variante.stock}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* QUANTITY SELECTOR */}
              <div className="border-t border-[#262626] pt-6">
                <p className="text-xs font-bold uppercase text-gray-400 mb-3">Cantidad</p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-[#050505] border border-[#262626] rounded-lg overflow-hidden">
                    <button
                      onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                      className="px-3 py-2 text-[#CCFF00] font-black hover:bg-[#CCFF00]/10 transition"
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
                      className="px-3 py-2 text-[#CCFF00] font-black hover:bg-[#CCFF00]/10 transition"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    disabled={!producto.disponible || !varianteSeleccionada}
                    className={`py-2 px-6 font-black uppercase text-xs rounded-lg transition transform hover:scale-105 active:scale-95 ${
                      agregado
                        ? "bg-green-500 text-black shadow-lg shadow-green-500/50"
                        : producto.disponible && varianteSeleccionada
                        ? "bg-[#CCFF00] text-black hover:bg-white shadow-lg shadow-[#CCFF00]/50"
                        : "bg-gray-600 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {agregado ? "✓ Añadido" : "Añadir"}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">Stock: {varianteSeleccionada?.stock || 0}</p>
              </div>
            </div>

            {/* FEATURES */}
            <div className="grid grid-cols-2 gap-4 my-8 py-8 border-y border-[#262626]">
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase">Disponibilidad</p>
                <p className="font-black text-[#CCFF00]">{producto.disponible ? "En Stock" : "Agotado"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase">Categoría</p>
                <p className="font-black uppercase">{producto.categoria?.description || "N/A"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase">Marca</p>
                <p className="font-black uppercase">{producto.marca?.nombre || "N/A"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase">ID Producto</p>
                <p className="font-black">{producto.idProducto}</p>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

export default ProductDetails
