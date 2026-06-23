import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { crearCupon } from "../../Redux/slices/cuponSlice";

const AdminCuponForm = () => {
  const dispatch = useDispatch();
  const { crearLoading, crearError } = useSelector((state) => state.cupones);

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    costoPuntos: "",
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "costoPuntos" ? parseInt(value) || "" : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre.trim()) {
      alert("El nombre del cupón es requerido");
      return;
    }

    if (!formData.descripcion.trim()) {
      alert("La descripción es requerida");
      return;
    }

    if (!formData.costoPuntos || formData.costoPuntos <= 0) {
      alert("El costo en puntos debe ser mayor a 0");
      return;
    }

    try {
      await dispatch(crearCupon(formData)).unwrap();
      setEnviado(true);
      setFormData({
        nombre: "",
        descripcion: "",
        costoPuntos: "",
      });

      // Limpiar mensaje de éxito después de 3 segundos
      setTimeout(() => setEnviado(false), 3000);
    } catch (error) {
      console.error("Error al crear cupón:", error);
    }
  };

  return (
    <div className="bg-[#141414] border border-[#262626] rounded-lg p-8 max-w-2xl w-full">
      <h2 className="font-headline-md text-2xl text-white uppercase mb-6">
        Crear Nuevo Cupón
      </h2>

      {enviado && (
        <div className="mb-6 p-4 bg-[#CCFF00]/20 border border-[#CCFF00] rounded-lg">
          <p className="text-[#CCFF00] font-label-bold">
            ✅ Cupón creado exitosamente
          </p>
        </div>
      )}

      {crearError && (
        <div className="mb-6 p-4 bg-error/20 border border-error rounded-lg">
          <p className="text-error font-label-bold">
            ❌ Error: {crearError}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre */}
        <div>
          <label htmlFor="nombre" className="block font-label-bold text-sm text-on-surface-variant uppercase mb-2">
            Nombre del Cupón *
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej: Pase diario gratis"
            className="w-full bg-[#0A0A0A] border border-[#262626] text-white px-4 py-3 focus:outline-none focus:border-[#CCFF00] transition-colors"
          />
        </div>

        {/* Descripción */}
        <div>
          <label htmlFor="descripcion" className="block font-label-bold text-sm text-on-surface-variant uppercase mb-2">
            Descripción *
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Ej: Válido para todas las sucursales"
            rows="4"
            className="w-full bg-[#0A0A0A] border border-[#262626] text-white px-4 py-3 focus:outline-none focus:border-[#CCFF00] transition-colors resize-none"
          />
        </div>

        {/* Costo en Puntos */}
        <div>
          <label htmlFor="costoPuntos" className="block font-label-bold text-sm text-on-surface-variant uppercase mb-2">
            Costo en Puntos *
          </label>
          <input
            type="number"
            id="costoPuntos"
            name="costoPuntos"
            value={formData.costoPuntos}
            onChange={handleChange}
            placeholder="Ej: 100"
            min="1"
            className="w-full bg-[#0A0A0A] border border-[#262626] text-white px-4 py-3 focus:outline-none focus:border-[#CCFF00] transition-colors"
          />
        </div>

        {/* Botones */}
        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            disabled={crearLoading}
            className="flex-1 bg-[#CCFF00] hover:bg-[#b8e600] text-[#0A0A0A] font-label-bold text-label-bold px-6 py-3 uppercase transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {crearLoading ? "CREANDO..." : "CREAR CUPÓN"}
          </button>
          <button
            type="reset"
            onClick={() => setFormData({ nombre: "", descripcion: "", costoPuntos: "" })}
            className="flex-1 border-2 border-[#262626] text-white font-label-bold text-label-bold px-6 py-3 uppercase transition-all hover:border-[#CCFF00]"
          >
            LIMPIAR
          </button>
        </div>
      </form>

      <p className="text-on-surface-variant text-sm mt-6">
        * Campos requeridos
      </p>
    </div>
  );
};

export default AdminCuponForm;
