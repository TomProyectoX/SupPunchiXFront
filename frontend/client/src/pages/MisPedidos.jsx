import { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdenes } from "../../redux/ordenSlice";

const formatCurrency = (value) =>
  `$${Number(value || 0).toLocaleString("es-AR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;

const getOrderItems = (orden) =>
  Array.isArray(orden?.detalles)
    ? orden.detalles.map((detalle) => {
        const producto = detalle.productoVariante?.producto;
        const sabor = detalle.productoVariante?.sabor;

        return {
          id: detalle.id,
          nombre: producto?.nombre || "Producto",
          sabor: sabor?.nombre || "",
          cantidad: Number(detalle.cantidad || 0),
          precio: Number(detalle.precioUnitario || producto?.precioFinal || producto?.precio || 0),
        };
      })
    : [];

const getOrderTotal = (orden) =>
  getOrderItems(orden).reduce((acc, item) => acc + item.precio * item.cantidad, 0);

const getStatusClass = (estado) => {
  if (estado === "PAGADA") return "border-[#CCFF00]/40 bg-[#CCFF00]/10 text-[#CCFF00]";
  if (estado === "CANCELADA") return "border-red-500/40 bg-red-500/10 text-red-300";
  if (estado === "CONFIRMADA") return "border-blue-400/40 bg-blue-400/10 text-blue-300";

  return "border-gray-500/40 bg-gray-500/10 text-gray-300";
};

const MisPedidos = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { ordenes, loadingOrdenes, error } = useSelector((state) => state.orden);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    dispatch(fetchOrdenes(token));
  }, [dispatch, navigate, token]);

  const pedidos = useMemo(
    () =>
      [...(ordenes || [])].sort((a, b) => {
        const dateDiff = new Date(b.fechaCreacion || 0) - new Date(a.fechaCreacion || 0);
        return dateDiff || Number(b.id || 0) - Number(a.id || 0);
      }),
    [ordenes]
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] px-6 pb-16 pt-28 text-white">
      <div className="mx-auto max-w-[1400px]">
        <Link
          to="/home"
          className="inline-flex items-center gap-2 rounded-2xl border border-[#262626] px-5 py-3 text-xs font-black uppercase tracking-widest text-white transition hover:border-[#CCFF00] hover:text-[#CCFF00]"
        >
          <span aria-hidden="true">←</span>
          Volver a home
        </Link>

        <div className="mt-8 flex flex-col gap-3 border-b border-[#262626] pb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[#CCFF00]">Historial</p>
          <h1 className="text-5xl font-black uppercase tracking-tight">Mis Pedidos</h1>
        </div>

        {loadingOrdenes && (
          <div className="mt-10 rounded-2xl border border-[#262626] bg-[#111111] p-8 text-gray-400">
            Cargando pedidos...
          </div>
        )}

        {error && (
          <div className="mt-10 rounded-2xl border border-red-500/40 bg-red-500/10 p-5 text-sm font-bold text-red-300">
            {typeof error === "string" ? error : "No se pudieron cargar los pedidos."}
          </div>
        )}

        {!loadingOrdenes && !error && pedidos.length === 0 && (
          <div className="mt-10 rounded-2xl border border-[#262626] bg-[#111111] p-8">
            <p className="text-gray-400">Todavia no tenes pedidos registrados.</p>
          </div>
        )}

        <div className="mt-10 space-y-6">
          {pedidos.map((orden) => {
            const items = getOrderItems(orden);
            const total = getOrderTotal(orden);

            return (
              <article key={orden.id} className="rounded-2xl border border-[#262626] bg-[#111111] p-6">
                <div className="flex flex-col gap-4 border-b border-[#262626] pb-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-gray-500">Orden de compra</p>
                    <h2 className="mt-2 text-2xl font-black uppercase">#{orden.id}</h2>
                    <p className="mt-1 text-sm text-gray-400">
                      Fecha: {orden.fechaCreacion || "Sin fecha"}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 md:items-end">
                    <span className={`rounded-full border px-4 py-2 text-xs font-black uppercase tracking-widest ${getStatusClass(orden.estado)}`}>
                      {orden.estado || "Sin estado"}
                    </span>
                    <p className="text-3xl font-black text-[#CCFF00]">{formatCurrency(total)}</p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col gap-2 rounded-2xl border border-[#262626] bg-black px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="text-sm font-black uppercase">{item.nombre}</p>
                        <p className="mt-1 text-xs uppercase tracking-widest text-gray-500">
                          {item.sabor ? `${item.sabor} · ` : ""}Cantidad: {item.cantidad}
                        </p>
                      </div>
                      <p className="font-black text-[#CCFF00]">
                        {formatCurrency(item.precio * item.cantidad)}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MisPedidos;
