import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import { fetchHistorialOrdenes } from "../../redux/ordenSlice";
import { fetchPagoByOrden } from "../../redux/pagosSlice";

const money = (value) => Number(value || 0).toLocaleString("es-AR");

const calcularSubtotal = (orden) =>
  orden.subtotal ??
  (orden.detalles || []).reduce(
    (sum, detalle) => sum + Number(detalle.precioUnitario || 0) * Number(detalle.cantidad || 0),
    0
  );

const calcularDescuento = (orden, subtotal) => {
  if (orden.descuentoCupon != null) return Number(orden.descuentoCupon) || 0;
  if (orden.cupon?.descuento == null) return 0;
  return subtotal * (Number(orden.cupon.descuento) || 0) / 100;
};

export default function OrderHistory() {
  const dispatch = useDispatch();
  const { token, role } = useSelector((state) => state.auth);
  const { historial } = useSelector((state) => state.orden);
  const { pagosPorOrden } = useSelector((state) => state.pagos);

  useEffect(() => {
    if (token && role !== "ADMIN") dispatch(fetchHistorialOrdenes(token));
  }, [dispatch, token, role]);

  useEffect(() => {
    if (!token || role === "ADMIN") return;
    historial.forEach((orden) => {
      if (orden.id && pagosPorOrden[orden.id] === undefined) {
        dispatch(fetchPagoByOrden({ ordenId: orden.id, token }));
      }
    });
  }, [dispatch, historial, token, role, pagosPorOrden]);

  if (!token) return <Navigate to="/login" replace />;
  if (role === "ADMIN") return <Navigate to="/admin/products" replace />;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-14">
        <h1 className="text-4xl font-black uppercase italic">
          Historial de <span className="text-[#CCFF00]">pedidos</span>
        </h1>

        <div className="mt-10 space-y-5">
          {historial.length === 0 && (
            <div className="border border-[#262626] bg-[#111] rounded-2xl p-10 text-center">
              <p className="text-gray-400">Todavia no tenes pedidos.</p>
              <Link
                to="/shop"
                className="inline-block mt-5 bg-[#CCFF00] text-black font-black uppercase px-6 py-3 rounded-lg"
              >
                Ir al catalogo
              </Link>
            </div>
          )}

          {[...historial].reverse().map((orden) => {
            const subtotal = calcularSubtotal(orden);
            const descuentoCupon = calcularDescuento(orden, subtotal);
            const total = orden.total ?? Math.max(subtotal - descuentoCupon, 0);
            const pago = pagosPorOrden[orden.id];

            return (
              <article key={orden.id} className="border border-[#262626] bg-[#111] rounded-2xl p-6">
                <div className="flex flex-wrap justify-between gap-3 border-b border-[#262626] pb-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Pedido</p>
                    <p className="font-black">#{orden.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Fecha</p>
                    <p>{orden.fechaCreacion}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Estado</p>
                    <p className="text-[#CCFF00] font-black">{String(orden.estado).replaceAll("_", " ")}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Pago</p>
                    <p className="text-[#CCFF00] font-black">
                      {pago?.estado || "Pendiente"}
                      {pago?.metodoPago ? ` - ${pago.metodoPago}` : ""}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase">Total</p>
                    <p className="text-xl text-[#CCFF00] font-black">${money(total)}</p>
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  {(orden.detalles || []).map((detalle) => {
                    const esGratis = Number(detalle.precioUnitario || 0) === 0;
                    const sabor = detalle.productoVariante?.sabor?.nombre;

                    return (
                      <div key={detalle.id} className="flex justify-between gap-4 text-sm">
                        <span>
                          {detalle.productoVariante?.producto?.nombre} {sabor ? `- ${sabor}` : ""} x {detalle.cantidad}
                          {esGratis && <span className="ml-2 text-[#CCFF00] font-black uppercase">Gratis</span>}
                        </span>
                        <span className={esGratis ? "text-[#CCFF00] font-black" : ""}>
                          {esGratis ? "Gratis" : `$${money(Number(detalle.precioUnitario) * Number(detalle.cantidad))}`}
                        </span>
                      </div>
                    );
                  })}

                  {descuentoCupon > 0 && (
                    <>
                      <div className="flex justify-between text-sm pt-3 border-t border-[#262626] text-gray-400">
                        <span>Subtotal</span>
                        <span>${money(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-[#CCFF00]">
                        <span>Cupon ({orden.cupon?.descuento}% OFF)</span>
                        <span>-${money(descuentoCupon)}</span>
                      </div>
                    </>
                  )}

                  {orden.direccion && (
                    <p className="pt-3 text-xs text-gray-500">
                      Entrega: {orden.direccion.calle} {orden.direccion.numero}, {orden.direccion.ciudad}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}
