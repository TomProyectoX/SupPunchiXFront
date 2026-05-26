const CheckoutAddressForm = ({ form, onChange, onSubmit}) => {
  return (
    <div className="rounded-2xl border border-[#262626] bg-[#111111] p-6">
      <h1 className="text-3xl font-black uppercase mb-6">Direccion de envio</h1>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs uppercase text-gray-400">Calle</label>
            <input
              name="calle"
              value={form.calle}
              onChange={onChange}
              className="mt-2 w-full bg-[#0A0A0A] border border-[#262626] px-4 py-3 text-sm"
              placeholder="Av Siempre Viva"
              required
              
            />
          </div>
          <div>
            <label className="text-xs uppercase text-gray-400">Numero</label>
            <input
              name="numero"
              value={form.numero}
              onChange={onChange}
              className="mt-2 w-full bg-[#0A0A0A] border border-[#262626] px-4 py-3 text-sm"
              placeholder="742"
              required
              
            />
          </div>
          <div>
            <label className="text-xs uppercase text-gray-400">Ciudad</label>
            <input
              name="ciudad"
              value={form.ciudad}
              onChange={onChange}
              className="mt-2 w-full bg-[#0A0A0A] border border-[#262626] px-4 py-3 text-sm"
              placeholder="Springfield"
              required
              
            />
          </div>
          <div>
            <label className="text-xs uppercase text-gray-400">Provincia</label>
            <input
              name="provincia"
              value={form.provincia}
              onChange={onChange}
              className="mt-2 w-full bg-[#0A0A0A] border border-[#262626] px-4 py-3 text-sm"
              placeholder="Buenos Aires"
              required
              
            />
          </div>
          <div>
            <label className="text-xs uppercase text-gray-400">Codigo Postal</label>
            <input
              name="codigoPostal"
              value={form.codigoPostal}
              onChange={onChange}
              className="mt-2 w-full bg-[#0A0A0A] border border-[#262626] px-4 py-3 text-sm"
              placeholder="1000"
              required
              
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-[#CCFF00] text-black font-black uppercase py-3 rounded-lg hover:bg-white transition-colors disabled:opacity-50"
          
        >
          Confirmar direccion
        </button>
      </form>
    </div>
  );
};

export default CheckoutAddressForm;
