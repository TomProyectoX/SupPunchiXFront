import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { motion } from "framer-motion"
import { fetchProductoById } from "../../redux/productosSlice"
import { addToCarrito } from "../../redux/carritoSlice"
import { openCart } from "../../redux/cartWidgetSlice"
import ProductImage from "../assets/components/react/product/ProductImage";
import ProductVariantSelector from "../assets/components/react/product/ProductVariantSelector";
import ProductQuantitySelector from "../assets/components/react/product/ProductQuantitySelector";
import ProductFeatures from "../assets/components/react/product/ProductFeatures";

const ProductDetails = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const { productoporid: productoDetalle } = useSelector((state) => state.productos)
  const { token, role } = useSelector((state) => state.auth)

  const [varianteSeleccionada, setVarianteSeleccionada] = useState(null)
  const [cantidad, setCantidad] = useState(1)
  const [agregado, setAgregado] = useState(false)
  const [errorCarrito, setErrorCarrito] = useState("")

  useEffect(() => {
    dispatch(fetchProductoById(id))
  }, [dispatch, id])

  useEffect(() => {
    if (productoDetalle?.variantes?.length > 0) {
      setVarianteSeleccionada(productoDetalle.variantes[0])
    }
  }, [productoDetalle])

  const handleAddToCart = async () => {
    if (role === "ADMIN") {
      navigate("/admin/products");
      return;
    }
    if (!token) {
      navigate("/login");
      return;
    }
    if (!productoDetalle) return;

    const body = {
      idproducto: productoDetalle.idProducto,
      idsabor: varianteSeleccionada?.sabor?.idSabor ?? null,
      cantidad: cantidad,
    };

    setErrorCarrito("");

    const result = await dispatch(addToCarrito({ body, token }));

    if (addToCarrito.fulfilled.match(result)) {
      setAgregado(true);
      dispatch(openCart());
      setTimeout(() => setAgregado(false), 2000);
    } else {
      const msg = result.payload || result.error?.message || "Error al agregar al carrito";
      setErrorCarrito(msg);
    }
  };

  if (!productoDetalle) {
    return (
      <div className="bg-[#0A0A0A] text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#CCFF00] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-2xl font-black uppercase">Cargando...</h1>
        </div>
      </div>
    )
  }

  const tienePromo = productoDetalle.promo !== null && productoDetalle.promo !== undefined;
  const descuento = tienePromo ? Number(productoDetalle.promo.discount || 0) : 0;
  const precioOriginal = Number(productoDetalle.precio || 0);
  const precioFinal = tienePromo ? precioOriginal - (precioOriginal * descuento) / 100 : precioOriginal;

  return (
    <div className="relative bg-[#0A0A0A] text-white min-h-screen pb-24 overflow-hidden">

      <div className="absolute top-1/3 right-0 w-[700px] h-[700px] rounded-full bg-[#CCFF00] blur-[180px] opacity-[0.06] pointer-events-none" />

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProductImage producto={productoDetalle} tienePromo={tienePromo} descuento={descuento} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-between"
          >
            <div className="space-y-6">

              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs font-black uppercase bg-[#CCFF00] text-black px-3 py-1 rounded-full">
                  {productoDetalle.categoria?.description || "Elite"}
                </span>
                <span className="text-xs font-bold uppercase text-gray-500">
                  {productoDetalle.marca?.nombre || "Premium"}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-[1.05] tracking-tight italic">
                {productoDetalle.nombre}
              </h1>

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
                {productoDetalle.descripcion}
              </p>

              {productoDetalle.tamano && (
                <div className="border-t border-[#262626] pt-6">
                  <p className="text-xs font-bold uppercase text-gray-500 mb-2">Tamaño</p>
                  <p className="text-xl font-black text-[#CCFF00]">{productoDetalle.tamano}</p>
                </div>
              )}

              <ProductVariantSelector
                variantes={productoDetalle.variantes}
                varianteSeleccionada={varianteSeleccionada}
                onSelect={setVarianteSeleccionada}
              />

              {role === "ADMIN" ? (
                <button onClick={() => navigate("/admin/products")} className="w-full bg-[#CCFF00] text-black font-black uppercase py-4 rounded-lg">
                  Administrar productos
                </button>
              ) : <ProductQuantitySelector
                cantidad={cantidad}
                setCantidad={setCantidad}
                stock={varianteSeleccionada?.stock}
                disponible={productoDetalle.disponible}
                varianteSeleccionada={varianteSeleccionada}
                agregado={agregado}
                errorCarrito={errorCarrito}
                onAddToCart={handleAddToCart}
              />}
            </div>

            <ProductFeatures producto={productoDetalle} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
