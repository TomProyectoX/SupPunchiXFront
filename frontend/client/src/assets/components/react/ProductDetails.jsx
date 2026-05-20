import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const ProductDetails = () => {

  const { id } = useParams()

  const [producto, setProducto] = useState(null)

  const [varianteSeleccionada, setVarianteSeleccionada] = useState(null)



  useEffect(() => {

    fetch(`http://localhost:4002/productos/${id}`)
      .then((response) => response.json())
      .then((data) => setProducto(data))
      .catch((error) => console.error("Error al cargar producto", error))

  }, [id])

  if (!producto) {
    return (
      <div className="bg-[#131313] text-white min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Cargando...</h1>
      </div>
    )
  }

  return (
    <div className="bg-[#131313] text-white min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-[1280px] mx-auto">
        {/* PRODUCT SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* IMAGES */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="aspect-square bg-[#141414] border border-[#262626] overflow-hidden">
              <img
                src="https://placehold.co/800x800"
                alt={producto.nombre}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* INFO */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#CCFF00] text-sm font-bold uppercase">

                  {producto.marca?.nombre || "Elite Series"}

                </span>

                <div className="w-2 h-2 rounded-full bg-[#CCFF00]" />
                <span className="text-gray-400 text-sm uppercase">

                  {producto.disponible ? "In Stock" : "Out of Stock"}

                </span>
              </div>

              <h1 className="text-5xl font-black uppercase leading-tight">

                {producto.nombre}

              </h1>

              <div className="flex items-center gap-4 mt-4">
                <span className="text-4xl font-black text-[#CCFF00]">

                  ${producto.precio}

                </span>
              </div>
            </div>

            <p className="text-gray-400 text-lg leading-relaxed">

              {producto.descripcion}

            </p>

            {/* CATEGORY */}
            <div>
              <h3 className="uppercase text-sm font-bold mb-2 text-[#CCFF00]">

                Category

              </h3>

              <p className="text-gray-300">

                {producto.categoria?.description || "No category"}

              </p>
            </div>

            {/* SIZE */}
            <div>
              <h3 className="uppercase text-sm font-bold mb-2 text-[#CCFF00]">

                Size

              </h3>

              <p className="text-gray-300">

                {producto.tamano || "No size"}

              </p>
            </div>

            {/* FLAVORS */}
            <div>

              <h3 className="uppercase text-sm font-bold mb-4">
                Available Flavors
              </h3>

              <div className="flex flex-wrap gap-3">

                {producto.variantes?.length > 0 ? (

                  producto.variantes.map((variante) => (

                    <button
                      key={variante.id}

                      onClick={() => setVarianteSeleccionada(variante)}

                      className={`px-5 py-2 border uppercase transition
                      ${
                        varianteSeleccionada?.id === variante.id
                          ? "border-[#CCFF00] text-[#CCFF00]"
                          : "border-[#262626] hover:border-[#CCFF00]"
                      }`}

                    >

                      {variante.sabor?.nombre}

                    </button>

                  ))

                ) : (

                  <p className="text-gray-500">
                    No flavors available
                  </p>

                )}

              </div>

              <div className="mt-4">

                {varianteSeleccionada ? (

                  <p className="text-sm text-gray-300">
                    Stock disponible: {varianteSeleccionada.stock}
                  </p>

                ) : (

                  <p className="text-sm text-gray-500">
                    Seleccioná un sabor
                  </p>

                )}

              </div>

            </div>

            {/* BUY */}
            <div className="flex gap-4">
              <div className="flex items-center border border-[#262626] bg-[#141414]">
                <button className="px-4 py-3 text-[#CCFF00] text-xl">
                  -
                </button>

                <span className="px-6 font-bold">
                  1
                </span>

                <button className="px-4 py-3 text-[#CCFF00] text-xl">
                  +
                </button>
              </div>

              <button className="flex-1 bg-[#CCFF00] text-black font-black uppercase text-lg hover:opacity-90 transition">
                Add To Cart
              </button>
            </div>

            {/* EXTRA INFO */}
            <div className="border-t border-[#262626] pt-6 space-y-4">
              <div className="flex items-center gap-3 text-gray-400">
                🚚 Free shipping on orders over $100
              </div>

              <div className="flex items-center gap-3 text-gray-400">
                ✔️ Lab tested & athlete certified
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails