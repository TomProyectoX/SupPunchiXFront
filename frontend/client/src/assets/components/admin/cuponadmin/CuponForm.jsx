export default function CuponForm({
  tipoCupon,
  setTipoCupon,
  descuento,
  setDescuento,
  costo,
  setCosto,
  productos,
  variantesSeleccionadas,
  handleVarianteChange,
  handleCreateCupon,
  resetForm,
}) {
  return (
    <form
      onSubmit={handleCreateCupon}
      className="rounded-2xl border border-gray-700 bg-[#111111] p-6"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-black">Crear Cupon</h1>
        <p className="text-gray-400 mt-2">
          Crea un cupon de descuento o de productos gratis.
        </p>
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-sm font-bold">Tipo de cupon</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="tipoCupon"
              value="descuento"
              checked={tipoCupon === "descuento"}
              onChange={(e) => setTipoCupon(e.target.value)}
              className="accent-[#CCFF00]"
            />
            <span className="text-sm">Descuento porcentual</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="tipoCupon"
              value="productos"
              checked={tipoCupon === "productos"}
              onChange={(e) => setTipoCupon(e.target.value)}
              className="accent-[#CCFF00]"
            />
            <span className="text-sm">Productos gratis</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block mb-2 text-sm font-bold">
            Costo en puntos
          </label>
          <input
            type="number"
            min="1"
            value={costo}
            onChange={(e) => setCosto(e.target.value)}
            className="w-full rounded-lg bg-black border border-gray-700 px-4 py-3 outline-none"
            required
          />
        </div>

        {tipoCupon === "descuento" && (
          <div>
            <label className="block mb-2 text-sm font-bold">
              Descuento (%)
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={descuento}
              onChange={(e) => setDescuento(e.target.value)}
              className="w-full rounded-lg bg-black border border-gray-700 px-4 py-3 outline-none"
              required
            />
          </div>
        )}
      </div>

      {tipoCupon === "productos" && (
        <div>
          <h2 className="text-xl font-bold mb-4">Variantes de producto</h2>
          <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto">
            {productos.map((producto) =>
              producto.variantes?.map((variante) => (
                <label
                  key={variante.id}
                  className="flex items-center gap-4 rounded-xl border border-gray-700 bg-black p-5 cursor-pointer hover:border-[#CCFF00] transition-all"
                >
                  <input
                    type="checkbox"
                    className="w-6 h-6 accent-[#CCFF00] cursor-pointer"
                    checked={variantesSeleccionadas.includes(variante.id)}
                    onChange={() => handleVarianteChange(variante.id)}
                  />
                  <div>
                    <p className="font-bold text-lg">{producto.nombre}</p>
                    <p className="text-gray-400">
                      {variante.sabor?.nombre || "Sin sabor"} — Stock: {variante.stock}
                    </p>
                  </div>
                </label>
              ))
            )}
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          className="mt-8 rounded-lg bg-[#CCFF00] px-6 py-3 font-black text-black"
        >
          Crear Cupon
        </button>
        <button
          type="button"
          onClick={resetForm}
          className="mt-8 rounded-lg bg-gray-700 px-6 py-3 font-black"
        >
          Limpiar
        </button>
      </div>
    </form>
  );
}
