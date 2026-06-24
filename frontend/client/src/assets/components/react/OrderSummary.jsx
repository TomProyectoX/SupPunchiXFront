import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OrderSummary = ({ items, total, onDeleteDetail }) => {
  const [detalleAEliminar, setDetalleAEliminar] = useState(null);

  useEffect(() => {
    console.log('[OrderSummary] items', items);
    console.log('[OrderSummary] items length', items.length);
  }, [items]);

  const confirmarEliminar = () => {
    if (detalleAEliminar) {
      onDeleteDetail?.(detalleAEliminar);
    }
    setDetalleAEliminar(null);
  };

  return (
    <>
      <div className="rounded-2xl border border-[#262626] bg-[#111111] p-6">

        <h2 className="text-sm uppercase text-gray-400">
          Tu orden
        </h2>

        <div className="mt-4 space-y-4">

          {items.length === 0 ? (

            <div className="text-center py-8">
              <span className="material-symbols-outlined text-gray-600 text-3xl mb-2 block">shopping_bag</span>
              <p className="text-sm text-gray-400">
                No hay productos en la orden.
              </p>
            </div>

          ) : (

            items.map((item) => (

              <div
                key={`${item.idDetalle ?? item.idProducto}-${item.idSabor ?? 0}`}
                className="flex items-start justify-between gap-4 border-b border-[#262626] pb-3"
              >

                <div className="min-w-0">

                  <p className="text-xs uppercase text-gray-400">
                    {item.sabor || 'Sabor'}
                  </p>

                  <p className="text-sm font-black uppercase">
                    {item.nombre || 'Producto'}
                  </p>

                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-xs text-gray-500">
                      Cantidad: {item.cantidad || 0}
                    </p>

                    <button
                      type="button"
                      onClick={() => setDetalleAEliminar(item)}
                      className="text-[10px] uppercase font-black tracking-wide text-red-400 hover:text-red-300 transition"
                    >
                      Eliminar detalle
                    </button>
                  </div>

                </div>

                <span className="text-sm font-black text-[#CCFF00]">
                  ${Number(item.precio || 0).toLocaleString('es-AR')}
                </span>

              </div>

            ))

          )}

          <div className="flex items-center justify-between pt-2">

            <span className="text-sm text-gray-400">
              Total
            </span>

            <span className="text-2xl font-black text-[#CCFF00]">
              ${Number(total || 0).toLocaleString('es-AR')}
            </span>

          </div>

        </div>

      </div>

      {/* MODAL DE CONFIRMACION */}
      <AnimatePresence>
        {detalleAEliminar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-[200] p-4"
            onClick={() => setDetalleAEliminar(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="bg-[#141414] border border-[#262626] rounded-2xl p-6 w-full max-w-sm relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 mx-auto mb-4">
                <span className="material-symbols-outlined text-red-400 text-2xl">warning</span>
              </div>

              <h3 className="text-white text-lg font-black uppercase text-center mb-2">
                ¿Estás seguro?
              </h3>
              <p className="text-gray-400 text-sm text-center mb-6">
                ¿Deseás eliminar{' '}
                <span className="text-white font-bold">{detalleAEliminar.nombre || 'este producto'}</span>{' '}
                de tu orden?
              </p>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setDetalleAEliminar(null)}
                  className="flex-1 py-3 rounded-lg border border-[#262626] text-gray-300 font-black uppercase text-xs hover:border-[#CCFF00] hover:text-[#CCFF00] transition"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={confirmarEliminar}
                  className="flex-1 py-3 rounded-lg bg-red-500 text-white font-black uppercase text-xs hover:bg-red-600 transition"
                >
                  Eliminar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OrderSummary;