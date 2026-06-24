const CardPaymentForm = ({ tarjeta, setTarjeta, expiracion, setExpiracion, cvv, setCvv, disabled }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs uppercase tracking-[0.25em] text-gray-400 mb-3">Número de tarjeta</label>
        <input
          type="text"
          placeholder="4242 4242 4242 4242"
          value={tarjeta}
          onChange={(e) => setTarjeta(e.target.value)}
          disabled={disabled}
          className="w-full rounded-2xl border border-[#262626] bg-black px-5 py-5 outline-none focus:border-[#CCFF00] disabled:opacity-40 disabled:cursor-not-allowed"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-xs uppercase tracking-[0.25em] text-gray-400 mb-3">Expiración</label>
          <input
            type="text"
            placeholder="MM/AA"
            value={expiracion}
            onChange={(e) => setExpiracion(e.target.value)}
            disabled={disabled}
            className="w-full rounded-2xl border border-[#262626] bg-black px-5 py-5 outline-none focus:border-[#CCFF00] disabled:opacity-40 disabled:cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-[0.25em] text-gray-400 mb-3">CVV</label>
          <input
            type="text"
            placeholder="123"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            disabled={disabled}
            className="w-full rounded-2xl border border-[#262626] bg-black px-5 py-5 outline-none focus:border-[#CCFF00] disabled:opacity-40 disabled:cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
};

export default CardPaymentForm;