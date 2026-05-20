import { useEffect, useState } from "react"
import ProductoCard from "../assets/components/react/ProductoCard.jsx"

const ProductList = () => {
  const [productos, setProductos] = useState([])
  // filtro seleccionado
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("")
  const [price, setPrice] = useState(250);

  const URL = "http://localhost:4002/productos"


export default function 
  const getcategorias = async () => {
const response = await fetch('http://localhost:4002/categories', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
const data = await response.json();

const categories = data.map(categorie =>(
   categorie.description
))

return categories

}

  // productos filtrados
const productosFiltrados = categoriaSeleccionada
  ? productos.filter(
      (producto) =>
        producto.categoria.description.toLowerCase() ===
        categoriaSeleccionada.toLowerCase()
    )
  : productos

  // Función para poder marcar y desmarcar la categoría
  const handleCategoryChange = (categoria) => {
    setCategoriaSeleccionada((prev) => (prev === categoria ? "" : categoria))
  }

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen pt-24 px-6">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row gap-6">
        
        {/* SIDEBAR */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-8">

            {/* TITLE */}
            <div className="kinetic-border pb-4">
              <h2 className="text-3xl font-black uppercase text-white leading-tight">
                Filters
              </h2>
            </div>

            {/* CATEGORY */}
            <div className="space-y-4">
              <h3 className="text-xl font-black uppercase text-[#CCFF00]">
                Category
              </h3>

              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded-none border-[#262626] !bg-black checked:!bg-[#CCFF00] text-black focus:ring-0 cursor-pointer" 
                  />
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                 
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
               
                </label>
              </div>
            </div>

            {/* BRAND */}
            <div className="space-y-4">
              <h3 className="text-xl font-black uppercase text-[#CCFF00]">
                Brand
              </h3>

              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded-none border-[#262626] !bg-black checked:!bg-[#CCFF00] text-black focus:ring-0 cursor-pointer" 
                  />
                  <span className="text-xs font-bold uppercase text-white group-hover:text-[#CCFF00] transition-colors">
                    Iron Arch Elite
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded-none border-[#262626] !bg-black checked:!bg-[#CCFF00] text-black focus:ring-0 cursor-pointer" 
                  />
                  <span className="text-xs font-bold uppercase text-white group-hover:text-[#CCFF00] transition-colors">
                    Raw Kinetic
                  </span>
                </label>
              </div>
            </div>

            {/* FLAVOR */}
            <div className="space-y-4">
              <h3 className="text-xl font-black uppercase text-[#CCFF00]">
                Flavor
              </h3>

              <div className="flex flex-col gap-2">
                {["Chocolate", "Vanilla", "Berry Blast", "Fruit Punch"].map(
                  (flavor) => (
                    <label key={flavor} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded-none border-[#262626] !bg-black checked:!bg-[#CCFF00] text-black focus:ring-0 cursor-pointer" 
                      />
                      <span className="text-xs font-bold uppercase text-white group-hover:text-[#CCFF00] transition-colors">
                        {flavor}
                      </span>
                    </label>
                  )
                )}
              </div>
            </div>



  {/* PRICE */}
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <h3 className="text-xl font-black uppercase text-[#CCFF00]">
        Price Range
      </h3>
      {/* Acá mostramos el precio actual dinámicamente */}
      <span className="text-white bg-[#141414] border border-[#262626] px-3 py-1 font-bold text-sm tracking-wider">
        ${price}
      </span>
    </div>

    <input
      type="range"
      min="0"
      max="250"
      value={price} // Vinculamos el valor de la barra al estado
      onChange={(e) => setPrice(Number(e.target.value))} // Actualiza el estado al moverla
      className="w-full h-2 bg-black appearance-none cursor-pointer accent-[#CCFF00]"
    />

    <div className="flex justify-between text-sm text-[#c4c9ac] font-bold">
      <span>$0</span>
      <span>$250+</span>
    </div>
  </div>


            {/* AVAILABILITY */}
            <div className="space-y-4 pt-4 border-t border-[#262626]">
              <h3 className="text-xl font-black uppercase text-[#CCFF00]">
                Availability
              </h3>

              <label className="flex items-center justify-between cursor-pointer group pt-2">
                <span className="text-xs font-bold uppercase text-white group-hover:text-[#CCFF00] transition-colors">
                  In Stock Only
                </span>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-black peer-focus:outline-none rounded-none peer peer-checked:after:translate-x-full peer-checked:after:border-black after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#262626] after:border-[#262626] after:border after:h-5 after:w-5 after:transition-all peer-checked:bg-[#CCFF00] peer-checked:after:bg-black"></div>
                </div>
              </label>
            </div>

          </div>
        </aside>

        {/* PRODUCTS */}
        <section className="flex-grow">
          <div className="flex justify-between items-end mb-8">
            <div>
              <p className="text-sm text-gray-400 uppercase mb-2">
                Showing {productosFiltrados.length} Results
              </p>

              <h1 className="text-5xl font-black uppercase italic">
                Elite Supplements
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productosFiltrados.map((producto) => (
              <ProductoCard
                key={producto.idProducto}
                producto={producto}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default ProductList