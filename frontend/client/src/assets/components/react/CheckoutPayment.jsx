import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { procesarPago } from "../../../../redux/ordenSlice";
import DeliveryAddressCard from "./DeliveryAddressCard";
import CardPaymentForm from "./CardPaymentForm";

const CheckoutPayment = ({ orden, onBack }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [tarjeta, setTarjeta] = useState("");
  const [expiracion, setExpiracion] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");

  const tieneProductos = Array.isArray(orden?.detalles) && orden.detalles.length > 0;

  const handleConfirmarPago = async () => {
    if (!tieneProductos) return;

    if (!tarjeta.trim() || !expiracion.trim() || !cvv.trim()) {
      setError("Completá todos los campos de pago.");
      return;
    }
    setError("");

    const body = {
      ordenId: orden.id,
      estado: "APROBADO",
      metodoPago: "TARJETA",
    };

    const result = await dispatch(procesarPago({ body, token }));

    if (procesarPago.fulfilled.match(result)) {
      navigate('/pago-confirmado');
    } else {
      console.error('Error procesando pago:', result.error);
      setError("Error al procesar el pago. Intentá de nuevo.");
    }
  };

  return (
    <div className="rounded-3xl border border-[#262626] bg-[#111111] p-8">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#CCFF00]">Paso final</p>
          <h1 className="text-5xl font-black uppercase mt-2">Pago</h1>
        </div>
        <button
          onClick={onBack}
          className="border border-[#2A2A2A] px-5 py-3 rounded-xl text-sm uppercase tracking-wider hover:border-[#CCFF00] transition"
        >
          Editar dirección
        </button>
      </div>

      {!tieneProductos && (
        <div className="mb-8 flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4">
          <span className="material-symbols-outlined text-red-400">error</span>
          <p className="text-sm text-red-300 font-bold">
            No hay productos en tu orden. Volvé al carrito antes de continuar.
          </p>
        </div>
      )}

      <div className="space-y-8">
        <DeliveryAddressCard direccion={orden?.direccion} />

        <CardPaymentForm
          tarjeta={tarjeta}
          setTarjeta={setTarjeta}
          expiracion={expiracion}
          setExpiracion={setExpiracion}
          cvv={cvv}
          setCvv={setCvv}
          disabled={!tieneProductos}
        />

        {error && (
          <p className="text-sm text-red-400 font-bold">{error}</p>
        )}

        <button
          disabled={!tieneProductos}
          className={`w-full font-black uppercase rounded-2xl py-5 mt-4 transition ${
            tieneProductos
              ? "bg-[#CCFF00] text-black hover:scale-[1.01]"
              : "bg-gray-700 text-gray-500 cursor-not-allowed"
          }`}
          onClick={handleConfirmarPago}
        >
          Confirmar pago
        </button>
      </div>
    </div>
  );
};

export default CheckoutPayment;