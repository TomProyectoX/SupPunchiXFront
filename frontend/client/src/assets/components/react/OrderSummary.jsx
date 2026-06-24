const OrderSummary = ({ items, total, descuento = 0, puntosUsados = 0, onDeleteDetail }) => {
  const totalFinal = Math.max(0, total - descuento);

  return (
    <div className="rounded-2xl border border-[#262626] bg-[#111111] p-6">
      <h2 className="text-sm uppercase text-gray-400">Tu orden</h2>

      <div className="mt-4 space-y-4">
        {items.length === 0 ? (
          <p className="text-sm text-gray-400">No hay productos en la orden.</p>
        ) : (
          items.map((item) => (
            <div
              key={`${item.idDetalle ?? item.idProducto}-${item.idSabor ?? 0}`}
              className="flex items-start justify-between gap-4 border-b border-[#262626] pb-3"
            >
              <div className="min-w-0">
                <p className="text-xs uppercase text-gray-400">{item.sabor || 'Sabor'}</p>
                <p className="text-sm font-black uppercase">{item.nombre || 'Producto'}</p>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-xs text-gray-500">Cantidad: {item.cantidad || 0}</p>
                  {onDeleteDetail && (
                    <button
                      type="button"
                      onClick={() => onDeleteDetail(item)}
                      className="text-[10px] uppercase font-black tracking-wide text-red-400 hover:text-red-300 transition"
                    >
                      Eliminar detalle
                    </button>
                  )}
                </div>
              </div>
              <span className="text-sm font-black text-[#CCFF00]">
                ${Number(item.precio || 0).toLocaleString('es-AR')}
              </span>
            </div>
          ))
        )}

        {/* Subtotal */}
        <div className="flex items-center justify-between pt-2 text-sm">
          <span className="text-gray-400">Subtotal</span>
          <span className="text-white">${Number(total || 0).toLocaleString('es-AR')}</span>
        </div>

        {/* Descuento por puntos — solo si hay descuento activo */}
        {descuento > 0 && (
          <div className="flex items-center justify-between text-sm text-[#CCFF00]">
            <span>Descuento ({puntosUsados} pts × $50)</span>
            <span>-${descuento.toLocaleString('es-AR')}</span>
          </div>
        )}

        {/* Total final */}
        <div className="flex items-center justify-between border-t border-[#262626] pt-3">
          <span className="text-sm text-gray-400">Total</span>
          <span className="text-2xl font-black text-[#CCFF00]">
            ${totalFinal.toLocaleString('es-AR')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
