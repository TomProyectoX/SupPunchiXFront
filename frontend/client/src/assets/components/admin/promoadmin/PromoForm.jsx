export default function PromoForm({
  editingPromoId,
  description,
  setDescription,
  discount,
  setDiscount,
  productos,
  productosSeleccionados,
  handleCheckboxChange,
  handleCreatePromo,
  handleEditPromo,
  resetForm,
}) {

  return (
    <form
      onSubmit={
        editingPromoId
          ? handleEditPromo
          : handleCreatePromo
      }
      className="
        rounded-2xl border border-gray-700
        bg-[#111111] p-6
      "
    >

      <div className="mb-8">

        <h1 className="text-3xl font-black">

          {editingPromoId
            ? "Editar Promo"
            : "Crear Promo"}

        </h1>

        <p className="text-gray-400 mt-2">
          Seleccioná los productos de la promo.
        </p>

      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">

        <div>

          <label className="block mb-2 text-sm font-bold">
            Descripción
          </label>

          <input
            type="text"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="
              w-full rounded-lg bg-black
              border border-gray-700
              px-4 py-3 outline-none
            "
            required
          />

        </div>

        <div>

          <label className="block mb-2 text-sm font-bold">
            Descuento (%)
          </label>

          <input
            type="number"
            value={discount}
            onChange={(e) =>
              setDiscount(e.target.value)
            }
            className="
              w-full rounded-lg bg-black
              border border-gray-700
              px-4 py-3 outline-none
            "
            required
          />

        </div>

      </div>

      <div>

        <h2 className="text-xl font-bold mb-4">
          Productos
        </h2>

        <div className="
          flex flex-col gap-4
          max-h-[500px] overflow-y-auto
        ">

          {productos.map((producto) => (

            <label
              key={producto.idProducto}
              className="
                flex items-center gap-4
                rounded-xl border border-gray-700
                bg-black p-5 cursor-pointer
                hover:border-[#CCFF00]
                transition-all
              "
            >

              <input
                type="checkbox"
                className="
                  w-6 h-6
                  accent-[#CCFF00]
                  cursor-pointer
                "
                checked={productosSeleccionados.includes(
                  producto.idProducto
                )}
                onChange={() =>
                  handleCheckboxChange(
                    producto.idProducto
                  )
                }
              />

              <div>

                <p className="font-bold text-lg">
                  {producto.nombre}
                </p>

                <p className="text-gray-400">
                  ${producto.precio}
                </p>

              </div>

            </label>

          ))}

        </div>

      </div>

      <div className="flex gap-4">

        <button
          type="submit"
          className="
            mt-8 rounded-lg bg-[#CCFF00]
            px-6 py-3 font-black text-black
          "
        >

          {editingPromoId
            ? "Guardar Cambios"
            : "Crear Promo"}

        </button>

        {editingPromoId && (

          <button
            type="button"
            onClick={resetForm}
            className="
              mt-8 rounded-lg bg-gray-700
              px-6 py-3 font-black
            "
          >
            Cancelar
          </button>

        )}

      </div>

    </form>
  );
}