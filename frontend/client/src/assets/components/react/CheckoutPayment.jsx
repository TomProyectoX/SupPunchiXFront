const CheckoutPayment = ({ orden, onBack }) => {
  return (
    <div className="rounded-3xl border border-[#262626] bg-[#111111] p-8">
      
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#CCFF00]">
            Paso final
          </p>

          <h1 className="text-5xl font-black uppercase mt-2">
            Pago
          </h1>
        </div>

        <button
          onClick={onBack}
          className="border border-[#2A2A2A] px-5 py-3 rounded-xl text-sm uppercase tracking-wider hover:border-[#CCFF00] transition"
        >
          Editar dirección
        </button>
      </div>

      <div className="space-y-8">

        <div className="border border-[#262626] rounded-2xl p-6 bg-black">
          <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-5">
            Dirección de entrega
          </p>

          <div className="space-y-3 text-sm">
            <p>{orden?.direccion?.calle} {orden?.direccion?.numero}</p>
            <p>{orden?.direccion?.ciudad}</p>
            <p>{orden?.direccion?.provincia}</p>
            <p>{orden?.direccion?.codigoPostal}</p>
          </div>
        </div>

        <div className="space-y-6">

          <div>
            <label className="block text-xs uppercase tracking-[0.25em] text-gray-400 mb-3">
              Número de tarjeta
            </label>

            <input
              type="text"
              placeholder="4242 4242 4242 4242"
              className="w-full rounded-2xl border border-[#262626] bg-black px-5 py-5 outline-none focus:border-[#CCFF00]"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">

            <div>
              <label className="block text-xs uppercase tracking-[0.25em] text-gray-400 mb-3">
                Expiración
              </label>

              <input
                type="text"
                placeholder="MM/AA"
                className="w-full rounded-2xl border border-[#262626] bg-black px-5 py-5 outline-none focus:border-[#CCFF00]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.25em] text-gray-400 mb-3">
                CVV
              </label>

              <input
                type="text"
                placeholder="123"
                className="w-full rounded-2xl border border-[#262626] bg-black px-5 py-5 outline-none focus:border-[#CCFF00]"
              />
            </div>

          </div>

          <button
            className="w-full bg-[#CCFF00] text-black font-black uppercase rounded-2xl py-5 mt-4 hover:scale-[1.01] transition"
          >
            Confirmar pago
          </button>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPayment;