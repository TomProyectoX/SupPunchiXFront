const Popup = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div
      // MODIFICACIÓN: Cambiamos z-50 por z-[100] para que pase por encima del Navbar,
      // y agregamos pt-[135px] o un padding para equilibrar el espacio útil si la pantalla es chica.
      className="fixed inset-0 bg-black/75 backdrop-blur-[4px] flex items-center justify-center z-[100] p-4 md:pt-24"
      onClick={onClose}
    >
      <div
        className="bg-[#F5F5F5] w-[720px] max-w-full h-[420px] rounded-2xl relative flex overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white text-2xl text-gray-500 hover:text-black shadow-md transition z-10"
        >
          ×
        </button>

        {/* LEFT SIDE */}
        <div className="w-1/2 flex flex-col justify-center px-8 py-6 bg-white">
          {/* MODIFICACIÓN: Cambié el color del texto a un tono oscuro para que se lea perfecto sobre el blanco */}
          <span className="text-[#a3cc00] font-black uppercase text-sm tracking-[3px] text-center mb-4">
            Exclusive Offer
          </span>

          <h2 className="text-black text-2xl font-black leading-snug text-center mb-5">
            ¡Suscribite y te regalo
            <br />
            $4000 para tu primer
            <br />
            compra hoy!
          </h2>

          <p className="text-gray-500 text-xs text-center mb-6">
            Recibí descuentos exclusivos,
            <br />
            promociones y nuevos lanzamientos.
          </p>

          <div className="flex flex-col gap-4">
            {/* EMAIL */}
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 px-4 py-2 rounded-lg outline-none text-black placeholder:text-gray-400 focus:border-[#CCFF00]"
            />

            {/* NAME */}
            <input
              type="text"
              placeholder="Nombre"
              className="border border-gray-300 px-4 py-2 rounded-lg outline-none text-black placeholder:text-gray-400 focus:border-[#CCFF00]"
            />

            {/* BUTTON - Cambié el color de fondo al #CCFF00 original para seguir la marca */}
            <button 
              onClick={onClose}
              className="bg-[#CCFF00] text-black py-2 rounded-lg font-bold hover:opacity-90 transition uppercase tracking-wider text-xs">
              ¡Sí, Quiero!
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2 h-full bg-gray-100">
          <img
            src="https://img.freepik.com/vector-gratis/composicion-botellas-suplementos-fitness_1284-23337.jpg?semt=ais_hybrid&w=740&q=80"
            alt="Promo"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default Popup