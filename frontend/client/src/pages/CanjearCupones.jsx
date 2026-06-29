import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCupones, canjearCupon, cancelarCupon, clearCuponesError } from "../../redux/cuponesSlice";
import { fetchCarrito } from "../../redux/carritoSlice";
import Navbar from "./Navbar";

const CanjearCupones = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { cupones, cuponActivo, error, loading } = useSelector((state) => state.cupones);
  const puntosActuales = useSelector((state) => state.puntos?.puntosActuales ?? 0);

  useEffect(() => {
    if (token) {
      dispatch(fetchCupones(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => dispatch(clearCuponesError()), 4000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleCanjear = async (cuponId) => {
    const result = await dispatch(canjearCupon({ id: cuponId, token }));
    if (!result.error) {
      dispatch(fetchCarrito(token));
    }
  };

  const handleCancelar = async (cuponId) => {
    const result = await dispatch(cancelarCupon({ id: cuponId, token }));
    if (!result.error) {
      dispatch(fetchCarrito(token));
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />

      <div className="pt-10 px-6 pb-16">
        <div className="max-w-[1400px] mx-auto">
          <button
            onClick={() => navigate("/home")}
            className="mb-8 font-black uppercase py-2 px-4 rounded-lg border-2 border-[#CCFF00] text-[#CCFF00] hover:bg-[#CCFF00] hover:text-black transition-colors"
          >
            ← Volver
          </button>

          <div className="flex items-baseline justify-between mb-10">
            <div>
              <h1 className="text-4xl md:text-5xl font-black uppercase">Cupones</h1>
              <p className="text-gray-400 mt-2">Canjea tus puntos por descuentos o productos.</p>
            </div>
            <div className="rounded-2xl border border-[#CCFF00]/30 bg-[#111111] px-6 py-4">
              <p className="text-xs uppercase tracking-[0.25em] text-gray-400">Tus puntos</p>
              <p className="text-3xl font-black text-[#CCFF00]">{puntosActuales}</p>
            </div>
          </div>

          {error && (
            <div className="mb-6 rounded-2xl border border-red-500/40 bg-red-500/10 px-5 py-4 text-sm font-bold text-red-400">
              {typeof error === "string" ? error : "Error al procesar el cupon."}
            </div>
          )}

          {cuponActivo && (
            <div className="mb-8 rounded-2xl border border-[#CCFF00]/50 bg-[#111111] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-[#CCFF00] mb-2">Cupon activo</p>
                  <p className="text-xl font-black">
                    {cuponActivo.descuento != null
                      ? `${cuponActivo.descuento}% OFF en tu orden`
                      : "Productos agregados a tu carrito"}
                  </p>
                </div>
                <button
                  onClick={() => handleCancelar(cuponActivo.id)}
                  className="rounded-lg border border-red-500 px-5 py-3 text-sm font-black uppercase text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                >
                  Cancelar cupon
                </button>
              </div>
            </div>
          )}

          {loading ? (
            <p className="text-gray-400">Cargando cupones...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cupones.length === 0 ? (
                <p className="text-gray-400">No hay cupones disponibles.</p>
              ) : (
                cupones.map((cupon) => {
                  const alcanza = puntosActuales >= cupon.costo;
                  const estaActivo = cuponActivo?.id === cupon.id;

                  return (
                    <div
                      key={cupon.id}
                      className="rounded-2xl border border-[#262626] bg-[#111111] p-6 flex flex-col justify-between"
                    >
                      <div>
                        <p className="text-2xl font-black text-[#CCFF00]">
                          {cupon.descuento != null
                            ? `${cupon.descuento}% OFF`
                            : "Productos gratis"}
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                          Costo: {cupon.costo} puntos
                        </p>

                        {cupon.productos && cupon.productos.length > 0 && (
                          <div className="mt-4 space-y-1">
                            <p className="text-xs uppercase text-gray-500">Incluye:</p>
                            {cupon.productos.map((pv) => (
                              <p key={pv.id} className="text-sm text-gray-300">
                                {pv.producto?.nombre || "Producto"}{" "}
                                <span className="text-gray-500">
                                  ({pv.sabor?.nombre || "Sin sabor"})
                                </span>
                              </p>
                            ))}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => handleCanjear(cupon.id)}
                        disabled={!alcanza || estaActivo}
                        className={`mt-6 w-full rounded-lg py-3 font-black uppercase transition-colors ${
                          estaActivo
                            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                            : alcanza
                              ? "bg-[#CCFF00] text-black hover:bg-white"
                              : "bg-gray-700 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        {estaActivo
                          ? "Canjeado"
                          : alcanza
                            ? "Canjear"
                            : "Puntos insuficientes"}
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CanjearCupones;
