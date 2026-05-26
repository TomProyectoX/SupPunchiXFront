import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../assets/components/react/sidebar/Sidebar"
import SortProducts from "../assets/components/react/sidebar/SortProducts"
import ProductoCard from "../assets/components/react/ProductoCard"
import CartWidget from "../assets/components/react/CartWidget"
import { useAuth } from "../hooks/useAuth"
import { fetchWithAuth } from "../utils/fetchWithAuth"

const ProductList = () => {
  const [productos, setProductos] = useState([])
  const [productosFiltrados, setProductosFiltrados] = useState([])
  const [ordenPrecio, setOrdenPrecio] = useState("default")

  const { token } = useAuth()
  const navigate = useNavigate()

  const URL = "http://localhost:4002/productos"

  useEffect(() => {
    const cargarProductos = async () => {
      if (!token) {
        return
      }

      try {
        const response = await fetchWithAuth(URL, {}, () => token, navigate)
        const data = await response.json()
        const productosArray = Array.isArray(data) ? data : []
        setProductos(productosArray)
        setProductosFiltrados(productosArray)
      } catch (error) {
        console.error("Error al cargar productos", error)
        setProductos([])
        setProductosFiltrados([])
      }
    }

    cargarProductos()
  }, [token, navigate])

  const productosOrdenados = useMemo(() => {
    return [...productosFiltrados].sort((a, b) => {
      const precioA = a.promo ? a.precio - (a.precio * a.promo.discount) / 100 : a.precio
      const precioB = b.promo ? b.precio - (b.precio * b.promo.discount) / 100 : b.precio

      if (ordenPrecio === "menor-mayor") {
        return Number(precioA) - Number(precioB)
      }

      if (ordenPrecio === "mayor-menor") {
        return Number(precioB) - Number(precioA)
      }

      return 0
    })
  }, [productosFiltrados, ordenPrecio])

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen pt-24 px-6">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row gap-6">
        <Sidebar
          productos={productos}
          onFilteredProductosChange={setProductosFiltrados}
        />

        <section className="flex-grow">
          <div className="flex justify-between items-end mb-8">
            <div>
              <p className="text-sm text-gray-400 uppercase mb-2">
                Mostrando {productosOrdenados.length} Resultados
              </p>

              <h1 className="text-5xl font-black uppercase italic">
                Suplementos
              </h1>
            </div>

            <SortProducts
              ordenPrecio={ordenPrecio}
              setOrdenPrecio={setOrdenPrecio}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {productosOrdenados.map((producto) => (
              <ProductoCard
                key={producto.idProducto ?? producto.id}
                producto={producto}
                view="grid"
              />
            ))}
          </div>
        </section>
      </div>
      <CartWidget />
    </div>
  )
}

export default ProductList
