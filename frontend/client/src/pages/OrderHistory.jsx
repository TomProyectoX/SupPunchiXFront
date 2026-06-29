import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import { fetchHistorialOrdenes } from "../../redux/ordenSlice";

const money = (value) => Number(value || 0).toLocaleString("es-AR");

export default function OrderHistory() {
  const dispatch = useDispatch();
  const { token, role } = useSelector((state) => state.auth);
  const { historial } = useSelector((state) => state.orden);

  useEffect(() => {
    if (token && role !== "ADMIN") dispatch(fetchHistorialOrdenes(token));
  }, [dispatch, token, role]);

  if (!token) return <Navigate to="/login" replace />;
  if (role === "ADMIN") return <Navigate to="/admin/products" replace />;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-14">
        <h1 className="text-4xl font-black uppercase italic">Historial de <span className="text-[#CCFF00]">pedidos</span></h1>
        <div className="mt-10 space-y-5">
          {historial.length === 0 && (
            <div className="border border-[#262626] bg-[#111] rounded-2xl p-10 text-center">
              <p className="text-gray-400">Todavía no tenés pedidos.</p>
              <Link to="/shop" className="inline-block mt-5 bg-[#CCFF00] text-black font-black uppercase px-6 py-3 rounded-lg">Ir al catálogo</Link>
            </div>
          )}
          {[...historial].reverse().map((orden) => {
            const total = (orden.detalles || []).reduce((sum, d) => sum + Number(d.precioUnitario || 0) * Number(d.cantidad || 0), 0);
            return (
              <article key={orden.id} className="border border-[#262626] bg-[#111] rounded-2xl p-6">
                <div className="flex flex-wrap justify-between gap-3 border-b border-[#262626] pb-4">
                  <div><p className="text-xs text-gray-500 uppercase">Pedido</p><p className="font-black">#{orden.id}</p></div>
                  <div><p className="text-xs text-gray-500 uppercase">Fecha</p><p>{orden.fechaCreacion}</p></div>
                  <div><p className="text-xs text-gray-500 uppercase">Estado</p><p className="text-[#CCFF00] font-black">{String(orden.estado).replaceAll("_", " ")}</p></div>
                  <div className="text-right"><p className="text-xs text-gray-500 uppercase">Total</p><p className="text-xl text-[#CCFF00] font-black">${money(total)}</p></div>
                </div>
                <div className="pt-4 space-y-2">
                  {(orden.detalles || []).map((d) => (
                    <div key={d.id} className="flex justify-between text-sm">
                      <span>{d.productoVariante?.producto?.nombre} × {d.cantidad}</span>
                      <span>${money(Number(d.precioUnitario) * Number(d.cantidad))}</span>
                    </div>
                  ))}
                  {orden.direccion && <p className="pt-3 text-xs text-gray-500">Entrega: {orden.direccion.calle} {orden.direccion.numero}, {orden.direccion.ciudad}</p>}
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}
