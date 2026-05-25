import { useEffect, useState } from "react"
import Sidebar from "../assets/components/react/sidebar/Sidebar"
import ProductoCard from "../assets/components/react/ProductoCard"
import Navbar from "./Navbar"
import SortProducts from "../assets/components/react/sidebar/SortProducts"

export default function ProductList() {

  const [productos, setProductos] = useState([])
  const [productosFiltrados, setProductosFiltrados] = useState([])
  const [ordenPrecio, setOrdenPrecio] = useState("default")

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
 const productosOrdenados = [...productosFiltrados].sort((a, b) => {

  const precioA = a.promo
    ? a.precio - (a.precio * a.promo.discount / 100)
    : a.precio

  const precioB = b.promo
    ? b.precio - (b.precio * b.promo.discount / 100)
    : b.precio

  if (ordenPrecio === "menor-mayor") {
    return Number(precioA) - Number(precioB)
  }

  if (ordenPrecio === "mayor-menor") {
    return Number(precioB) - Number(precioA)
  }

  return 0

})

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
                  Showing {productosOrdenados.length} Results
                </p>

                <h1 className="text-5xl font-black uppercase italic">
                  Elite Supplements
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