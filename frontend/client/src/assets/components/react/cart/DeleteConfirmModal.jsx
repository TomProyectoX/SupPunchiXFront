import { motion, AnimatePresence } from 'framer-motion';

const DeleteConfirmModal = ({ item, onCancel, onConfirm }) => {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[200] p-4"
          onClick={onCancel}
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
              <span className="text-white font-bold">{item.nombre || 'este producto'}</span>{' '}
              del carrito?
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 py-3 rounded-lg border border-[#262626] text-gray-300 font-black uppercase text-xs hover:border-[#CCFF00] hover:text-[#CCFF00] transition"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="flex-1 py-3 rounded-lg bg-red-500 text-white font-black uppercase text-xs hover:bg-red-600 transition"
              >
                Eliminar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmModal;