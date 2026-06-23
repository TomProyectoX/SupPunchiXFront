import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCupones } from "../Redux/slices/cuponSlice";
import AdminCuponForm from "../assets/components/admin/AdminCuponForm";

const AdminCupones = () => {
  const dispatch = useDispatch();
  const { cupones, loading } = useSelector((state) => state.cupones);

  useEffect(() => {
    dispatch(fetchCupones());
  }, [dispatch]);

  return (
    <main className="pt-24 px-margin max-w-container-max mx-auto pb-24">
      {/* Header */}
      <div className="mb-12">
        <h1 className="font-headline-lg text-headline-lg uppercase text-white tracking-tighter mb-2">
          GESTIÓN DE <span className="text-[#CCFF00]">CUPONES</span>
        </h1>
        <p className="font-body-lg text-on-surface-variant">
          Crea y administra los cupones de recompensa para tus usuarios
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulario */}
        <div className="lg:col-span-1">
          <AdminCuponForm />
        </div>

        {/* Lista de Cupones */}
        <div className="lg:col-span-2">
          <div className="bg-[#141414] border border-[#262626] rounded-lg p-8">
            <h2 className="font-headline-md text-2xl text-white uppercase mb-6">
              Cupones Activos
            </h2>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-4 animate-spin">
                  refresh
                </span>
                <p className="text-on-surface-variant">Cargando cupones...</p>
              </div>
            ) : cupones.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-4">
                  card_giftcard
                </span>
                <p className="text-on-surface-variant">No hay cupones creados aún</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cupones.map((cupon) => (
                  <div
                    key={cupon.id}
                    className="border border-[#262626] p-4 flex justify-between items-start hover:border-[#CCFF00] transition-colors group"
                  >
                    <div className="flex-1">
                      <h3 className="font-label-bold text-[#CCFF00] uppercase mb-1">
                        {cupon.nombre}
                      </h3>
                      <p className="text-body-md text-on-surface-variant mb-2">
                        {cupon.descripcion}
                      </p>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-on-surface-variant">
                          <span className="font-label-bold">ID:</span> {cupon.id}
                        </span>
                        <span className="text-sm text-on-surface-variant">
                          <span className="font-label-bold">Costo:</span> {cupon.costoPuntos} PTS
                        </span>
                        <span className="text-sm text-on-surface-variant">
                          <span className="font-label-bold">Canjes:</span> {cupon.canjes?.length || 0}
                        </span>
                      </div>
                    </div>
                    <button className="text-on-surface-variant hover:text-[#CCFF00] transition-colors p-2 group-hover:scale-110">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminCupones;
