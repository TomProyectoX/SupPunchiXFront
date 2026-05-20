import { useEffect, useState } from "react"
import ProductoCard from "./ProductoCard"
import { Link } from "react-router-dom" 


const FeaturedProducts = () => {

  const [productos, setProductos] = useState([])

  useEffect(() => {

    fetch("http://localhost:4002/productos")
      .then((response) => response.json())
      .then((data) => {

        // mostramos solo 3 productos en el home
        setProductos(data.slice(0, 3))
      })

      .catch((error) => {
        console.error("Error al cargar productos", error)
      })

  }, [])

  return (

    <section className="py-24 px-6 bg-[#0A0A0A]">
      <div className="container mx-auto">
        <div className="flex justify-between items-end mb-16 border-l-4 border-[#CCFF00] pl-6">
          <div>
            <h2 className="text-5xl font-black text-white uppercase">
              Featured Products
            </h2>

            <p className="text-gray-400 mt-3">
              Bestselling formulas for peak performance.
            </p>
          </div>

          <Link
            to="/Shop"
            className="text-[#CCFF00] font-bold border-b border-[#CCFF00]"
          >
            VIEW ALL
          </Link>

        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      
          {productos.map((producto) => (

            <ProductoCard
              key={producto.idProducto}
              producto={producto}
            />

          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts