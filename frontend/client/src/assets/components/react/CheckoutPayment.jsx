import { fetchWithAuth } from "../../../utils/fetchWithAuth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const CheckoutPayment = ({ orden, onBack }) => {
  
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleonclick =  async () => {
    setLoading(true);
    setAlert(null);

    const payload = {
      ordenId: orden.id,
      estado: "APROBADO",
      metodoPago: "TARJETA"
    };
    try{
      console.log('Payload para pago:', payload);
      const response = await fetchWithAuth('http://localhost:4002/pagos', {method: 'POST', 
        body: JSON.stringify(payload)}, () => token, navigate);
      
      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}: No pudimos procesar tu pago. Por favor, contacta a soporte.`);
      }

      const data = await response.json();

      setAlert({
        type: 'success',
        title: '¡Pago Aprobado!',
        message: 'Tu pago ha sido procesado exitosamente. ¡Gracias por tu compra!'
      });
      
      setTimeout(() => {
        navigate('/orders');
      }, 2000);
      
    } catch (e){
      console.error('Error procesando pago:', e);
      setAlert({
        type: 'error',
        title: 'Error en el Pago',
        message: e.message || 'No pudimos procesar tu pago. Por favor, intenta de nuevo.'
      });
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="rounded-3xl border border-[#262626] bg-[#111111] p-8 relative">
      
      {alert && (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${alert.type === 'success' ? 'bg-black/50' : 'bg-black/50'}`}>
          <div className={`rounded-3xl border-2 p-8 max-w-md w-full mx-4 ${
            alert.type === 'success' 
              ? 'border-[#CCFF00] bg-[#111111] shadow-lg shadow-[#CCFF00]/20' 
              : 'border-red-500 bg-[#111111] shadow-lg shadow-red-500/20'
          }`}>
            <div className="text-center">
              {alert.type === 'success' ? (
                <div className="text-5xl mb-4">✓</div>
              ) : (
                <div className="text-5xl mb-4">⚠</div>
              )}
              
              <h2 className={`text-2xl font-black uppercase mb-3 ${
                alert.type === 'success' ? 'text-[#CCFF00]' : 'text-red-500'
              }`}>
                {alert.title}
              </h2>
              
              <p className="text-gray-300 text-sm leading-relaxed">
                {alert.message}
              </p>

              {alert.type === 'error' && (
                <button
                  onClick={() => setAlert(null)}
                  className="mt-6 px-8 py-3 border border-[#CCFF00] text-[#CCFF00] rounded-xl font-bold uppercase text-sm hover:bg-[#CCFF00] hover:text-black transition"
                >
                  Intentar de nuevo
                </button>
              )}

              {alert.type === 'success' && (
                <p className="text-xs text-gray-400 mt-4">
                  Redirigiendo en 2 segundos...
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      
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
            disabled={loading}
            className={`w-full font-black uppercase rounded-2xl py-5 mt-4 transition ${
              loading 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : 'bg-[#CCFF00] text-black hover:scale-[1.01]'
            }`}
            onClick={handleonclick}
          > 
            {loading ? 'Procesando pago...' : 'Confirmar pago'}
          </button>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPayment;