// FeaturedProducts.jsx
import { useEffect, useState } from "react"
import { Link } from "react-router-dom" 
// IMPORTANTE: Importamos el diseño reutilizable de la tarjeta
import ProductoCard from "./ProductoCard" 

const FeaturedProducts = () => {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    fetch("http://localhost:4002/productos")
      .then((response) => response.json())
      .then((data) => {
        // Traemos los 3 productos de la base de datos
        setProductos(data.slice(0, 3))
      })
      .catch((error) => {
        console.error("Error al cargar productos", error)
      })
  }, [])

  return (
    <section className="py-12 px-4 md:px-8 bg-[#0A0A0A] w-full">
      <div className="max-w-full w-full">
        
        {/* CABECERA (Se mantiene igual) */}
        <div className="flex justify-between items-end mb-8 border-l-4 border-[#CCFF00] pl-4">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">
              Productos Destacados
            </h2>
          </div>
          <Link
            to="/Shop"
            className="text-[#CCFF00] font-bold border-b border-[#CCFF00] text-sm hover:text-white hover:border-white transition-colors"
          >
            Ver todo
          </Link>
        </div>

        {/* CONTENEDOR HORIZONTAL GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
          {productos.map((producto) => (
            
            /* REUTILIZACIÓN: Llamamos a la tarjeta general y le inyectamos el producto del backend */
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