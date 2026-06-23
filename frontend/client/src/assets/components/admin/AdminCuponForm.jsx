export default function AdminCuponForm({
  editingCuponId,
  formData,
  setFormData,
  onSubmit,
  onCancel,
  loading,
  error,
  exito,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "costoPuntos" ? parseInt(value) || "" : value,
    }));
  };

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
      className="rounded-2xl border border-gray-700 bg-[#111111] p-6"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-black">
          {editingCuponId ? "Editar Cupón" : "Crear Cupón"}
        </h1>
        <p className="text-gray-400 mt-2">
          Completá los datos del cupón de recompensa.
        </p>
      </div>

      {exito && (
        <div className="mb-6 rounded-lg bg-[#CCFF00]/10 border border-[#CCFF00] px-4 py-3">
          <p className="text-[#CCFF00] font-bold">
            ✅ Cupón {editingCuponId ? "actualizado" : "creado"} exitosamente
          </p>
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500 px-4 py-3">
          <p className="text-red-400 font-bold">❌ {error}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block mb-2 text-sm font-bold">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej: Pase diario gratis"
            className="w-full rounded-lg bg-black border border-gray-700 px-4 py-3 outline-none focus:border-[#CCFF00] transition-colors"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-bold">Costo en Puntos</label>
          <input
            type="number"
            name="costoPuntos"
            value={formData.costoPuntos}
            onChange={handleChange}
            placeholder="Ej: 100"
            min="1"
            className="w-full rounded-lg bg-black border border-gray-700 px-4 py-3 outline-none focus:border-[#CCFF00] transition-colors"
            required
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-sm font-bold">Descripción</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          placeholder="Ej: Válido para todas las sucursales"
          rows="3"
          className="w-full rounded-lg bg-black border border-gray-700 px-4 py-3 outline-none focus:border-[#CCFF00] transition-colors resize-none"
          required
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-lg bg-[#CCFF00] px-6 py-3 font-black text-black disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading
            ? editingCuponId ? "Guardando..." : "Creando..."
            : editingCuponId ? "Guardar Cambios" : "Crear Cupón"}
        </button>

        {editingCuponId && (
          <button
            type="button"
            onClick={onCancel}
            className="mt-2 rounded-lg bg-gray-700 px-6 py-3 font-black"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}