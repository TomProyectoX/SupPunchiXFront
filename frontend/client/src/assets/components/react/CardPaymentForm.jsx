const formatCardNumber = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
};

const formatExpiration = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

const CardPaymentForm = ({ tarjeta, setTarjeta, expiracion, setExpiracion, cvv, setCvv, disabled }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs uppercase tracking-[0.25em] text-gray-400 mb-3">Número de tarjeta</label>
        <input
          type="text"
          inputMode="numeric"
          placeholder="4242 4242 4242 4242"
          maxLength={19}
          value={tarjeta}
          onChange={(e) => setTarjeta(formatCardNumber(e.target.value))}
          disabled={disabled}
          className="w-full rounded-2xl border border-[#262626] bg-black px-5 py-5 outline-none focus:border-[#CCFF00] disabled:opacity-40 disabled:cursor-not-allowed"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-xs uppercase tracking-[0.25em] text-gray-400 mb-3">Expiración</label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="MM/AA"
            maxLength={5}
            value={expiracion}
            onChange={(e) => setExpiracion(formatExpiration(e.target.value))}
            disabled={disabled}
            className="w-full rounded-2xl border border-[#262626] bg-black px-5 py-5 outline-none focus:border-[#CCFF00] disabled:opacity-40 disabled:cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-[0.25em] text-gray-400 mb-3">CVV</label>
          <input
            type="password"
            inputMode="numeric"
            placeholder="123"
            maxLength={3}
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
            disabled={disabled}
            className="w-full rounded-2xl border border-[#262626] bg-black px-5 py-5 outline-none focus:border-[#CCFF00] disabled:opacity-40 disabled:cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
};

export default CardPaymentForm;
