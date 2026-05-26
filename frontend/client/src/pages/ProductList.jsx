import { useEffect, useState, useMemo } from "react"
import Sidebar from "../assets/components/react/sidebar/Sidebar"
import ProductoCard from "../assets/components/react/ProductoCard"
import Navbar from "./Navbar"
import SortProducts from "../assets/components/react/sidebar/SortProducts"
import { useSearchParams } from "react-router-dom"

export default function ProductList() {

  const [productos, setProductos] = useState([])
  const [productosFiltrados, setProductosFiltrados] = useState([])
  const [ordenPrecio, setOrdenPrecio] = useState("default")

  const [searchParams] = useSearchParams()
  const searchTerm = searchParams.get("search") || ""

  const URL = "http://localhost:4002/productos"

  useEffect(() => {

    fetch(URL)

      .then((response) => response.json())

      .then((data) => {

        console.log("PRODUCTOS:", data)

        const productosArray = Array.isArray(data) ? data : []

        setProductos(productosArray)
        setProductosFiltrados(productosArray)

      })

      .catch((error) => {

        console.error("Error al cargar productos", error)

        setProductos([])
        setProductosFiltrados([])

      })

  }, [])

  const handleFilteredProductos = (filtrados) => {

    setProductosFiltrados(
      Array.isArray(filtrados) ? filtrados : []
    )

  }

  // ORDENAR PRODUCTOS
  const productosOrdenados = useMemo(() => {
    let filtered = [...productosFiltrados]
    
    // Filtrar por término de búsqueda
     // Filtrar por término de búsqueda
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(producto => {
        // Asegurar que son strings antes de .toLowerCase()
        const nombre = String(producto.nombre || "").toLowerCase()
        const descripcion = String(producto.descripcion || "").toLowerCase()
        // Si categoria es un objeto, intentar obtener su nombre o propiedad
        let categoriaStr = ""
        if (producto.categoria) {
          if (typeof producto.categoria === "string") {
            categoriaStr = producto.categoria.toLowerCase()
          } else if (typeof producto.categoria === "object" && producto.categoria.nombre) {
            categoriaStr = String(producto.categoria.nombre).toLowerCase()
          }
        }

        return (
          nombre.includes(searchLower) ||
          descripcion.includes(searchLower) ||
          categoriaStr.includes(searchLower)
        )
      })
    }
    
          // Luego aplicar el ordenamiento de precio
      return filtered.sort((a, b) => {
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
    }, [productosFiltrados, ordenPrecio, searchTerm])

  return (

    <div>

      <Navbar />

      <div className="bg-[#0A0A0A] text-white min-h-screen pt-24 px-6">

        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row gap-6">

          <Sidebar
            productos={productos}
            onFilteredProductosChange={handleFilteredProductos}
          />

          <section className="flex-grow">

            <div className="flex justify-between items-end mb-8">

              <div>

                <p className="text-sm text-gray-400 uppercase mb-2">
                  Mostrando  {productosOrdenados.length} Resultados
                </p>

              </div>

              <SortProducts
                ordenPrecio={ordenPrecio}
                setOrdenPrecio={setOrdenPrecio}
              />

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

              {productosOrdenados.map((producto) => (

                <ProductoCard
                  key={producto.idProducto}
                  producto={producto}
                />

              ))}

            </div>

          </section>

        </div>

      </div>

    </div>

  )

}