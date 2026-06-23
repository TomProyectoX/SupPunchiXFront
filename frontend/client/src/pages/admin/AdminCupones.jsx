import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchWithAuth } from "../../utils/fetchWithAuth";
import AdminSidebar from "../../assets/components/admin/AdminSidebar";
import AdminHeader from "../../assets/components/admin/AdminHeader";
import AdminCuponForm from "../../assets/components/admin/AdminCuponForm";

const URL = "http://localhost:4002/cupones";

const FORM_INICIAL = {
  nombre: "",
  descripcion: "",
  costoPuntos: "",
};

export default function AdminCupones() {
  const [cupones, setCupones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [formExito, setFormExito] = useState(false);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);
  const [editingCuponId, setEditingCuponId] = useState(null);
  const [formData, setFormData] = useState(FORM_INICIAL);

  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
    fetchCupones();
  }, [token]);

  const fetchCupones = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(URL, { method: "GET" }, () => token, navigate);
      const data = await response.json();
      setCupones(data.cupones || data || []);
    } catch (error) {
      console.error("Error al cargar cupones:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.nombre.trim()) {
      setFormError("El nombre del cupón es requerido");
      return;
    }
    if (!formData.descripcion.trim()) {
      setFormError("La descripción es requerida");
      return;
    }
    if (!formData.costoPuntos || Number(formData.costoPuntos) <= 0) {
      setFormError("El costo en puntos debe ser mayor a 0");
      return;
    }

    setFormLoading(true);
    setFormError(null);
    setFormExito(false);

    try {
      const esEdicion = !!editingCuponId;
      const url = esEdicion ? `${URL}/${editingCuponId}` : URL;
      const method = esEdicion ? "PUT" : "POST";

      await fetchWithAuth(
        url,
        {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre: formData.nombre,
            descripcion: formData.descripcion,
            costoPuntos: Number(formData.costoPuntos),
          }),
        },
        () => token,
        navigate
      );

      setFormExito(true);
      resetForm();
      fetchCupones();
      setTimeout(() => setFormExito(false), 3000);
    } catch (error) {
      setFormError(error.message || "Ocurrió un error. Intenta de nuevo.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleEliminar = async (cuponId) => {
    if (!window.confirm("¿Estás seguro de que querés eliminar este cupón?")) return;

    setDeleteLoadingId(cuponId);
    try {
      await fetchWithAuth(
        `${URL}/${cuponId}`,
        { method: "DELETE" },
        () => token,
        navigate
      );
      fetchCupones();
    } catch (error) {
      console.error("Error al eliminar cupón:", error);
    } finally {
      setDeleteLoadingId(null);
    }
  };

  const handleSeleccionarEdicion = (cupon) => {
    setEditingCuponId(cupon.id);
    setFormData({
      nombre: cupon.nombre,
      descripcion: cupon.descripcion,
      costoPuntos: cupon.costoPuntos,
    });
    setFormError(null);
    setFormExito(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setEditingCuponId(null);
    setFormData(FORM_INICIAL);
    setFormError(null);
  };

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen">
      <AdminSidebar />
      <AdminHeader />

      <main className="ml-64 mt-20 px-8 py-8">

        <AdminCuponForm
          editingCuponId={editingCuponId}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onCancel={resetForm}
          loading={formLoading}
          error={formError}
          exito={formExito}
        />

        {/* Lista */}
        <div className="mt-10">
          <h2 className="text-2xl font-black mb-6">Cupones creados</h2>

          {loading ? (
            <p className="text-gray-400">Cargando cupones...</p>
          ) : cupones.length === 0 ? (
            <p className="text-gray-400">No hay cupones creados aún.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {cupones.map((cupon) => (
                <div
                  key={cupon.id}
                  className="flex items-center justify-between rounded-xl border border-gray-700 bg-black p-5"
                >
                  <div>
                    <p className="font-bold text-lg text-[#CCFF00]">{cupon.nombre}</p>
                    <p className="text-gray-400">{cupon.descripcion}</p>
                    <div className="flex gap-4 mt-2">
                      <p className="text-sm text-gray-500">
                        Costo: <span className="text-white font-bold">{cupon.costoPuntos} PTS</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Canjes: <span className="text-white font-bold">{cupon.canjes?.length || 0}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleSeleccionarEdicion(cupon)}
                      className="rounded-lg bg-blue-500 px-4 py-2 font-bold"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleEliminar(cupon.id)}
                      disabled={deleteLoadingId === cupon.id}
                      className="rounded-lg bg-red-500 px-4 py-2 font-bold disabled:opacity-50"
                    >
                      {deleteLoadingId === cupon.id ? "..." : "Eliminar"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}