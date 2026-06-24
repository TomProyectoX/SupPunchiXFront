import { motion, AnimatePresence } from 'framer-motion';

const Popup = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4 md:pt-24"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-[#181818] border border-[#262626] w-[720px] max-w-full h-[460px] rounded-2xl relative flex overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE BUTTON */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black border border-[#262626] flex items-center justify-center text-xl text-gray-400 hover:text-[#CCFF00] hover:border-[#CCFF00] transition z-50"
            >
              ×
            </button>

            {/* LEFT SIDE */}
            <div className="w-1/2 flex flex-col justify-center px-8 py-6 relative z-10">
              <span className="text-[#CCFF00] font-black uppercase text-xs tracking-[3px] text-center mb-4">
                Oferta Exclusiva
              </span>

              <h2 className="text-white text-2xl font-black leading-snug text-center mb-5 uppercase">
                ¡Suscribite y te regalo
                <br />
                <span className="text-[#CCFF00]">$4000</span> para tu primer
                <br />
                compra hoy!
              </h2>

              <p className="text-gray-400 text-xs text-center mb-6">
                Recibí descuentos exclusivos,
                <br />
                promociones y nuevos lanzamientos.
              </p>

              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-black border border-[#262626] px-4 py-2.5 rounded-lg outline-none text-white placeholder:text-gray-500 focus:border-[#CCFF00] transition-colors"
                />

                <input
                  type="text"
                  placeholder="Nombre"
                  className="bg-black border border-[#262626] px-4 py-2.5 rounded-lg outline-none text-white placeholder:text-gray-500 focus:border-[#CCFF00] transition-colors"
                />

                <button
                  type="button"
                  onClick={onClose}
                  className="bg-[#CCFF00] text-black py-3 rounded-lg font-black hover:bg-white transition-colors uppercase tracking-wider text-xs"
                >
                  ¡Sí, Quiero!
                </button>
              </div>
            </div>

            {/* RIGHT SIDE - MASCOTA */}
            <div className="w-1/2 h-full hidden md:flex items-center justify-center bg-[#181818] overflow-hidden">
              <img
                src="https://i.imgur.com/lWfn9et.png"
                alt="Unite a la familia Punchis"
                className="w-full h-full object-cover scale-90"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;