import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { procesarPago } from "../../../../redux/ordenSlice";
import { fetchCarrito } from "../../../../redux/carritoSlice";
import { fetchPuntosMe, usarPuntos, resetPuntos } from "../../../../redux/puntosSlice";
import DeliveryAddressCard from "./DeliveryAddressCard";
import CardPaymentForm from "./CardPaymentForm";

const CARD_NUMBER_MAX_LENGTH = 16;

const sanitizeCardNumber = (value) => value.replace(/\D/g, "").slice(0, CARD_NUMBER_MAX_LENGTH);

const formatCardNumber = (value) =>
  sanitizeCardNumber(value).replace(/(.{4})/g, "$1 ").trim();

const formatExpiration = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

const getCardType = (value) => {
  const digits = sanitizeCardNumber(value);
  if (/^4/.test(digits)) return "Visa";
  if (/^(5[1-5]|2[2-7])/.test(digits)) return "Mastercard";
  if (/^3[47]/.test(digits)) return "American Express";
  return "";
};

const isValidCardNumber = (value) => {
  const digits = sanitizeCardNumber(value);
  if (digits.length < 13 || digits.length > CARD_NUMBER_MAX_LENGTH) return false;
  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let digit = Number(digits[i]);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
};

const isValidExpiration = (value) => {
  const match = value.match(/^(\d{2})\/(\d{2})$/);
  if (!match) return false;
  const month = Number(match[1]);
  const year = Number(`20${match[2]}`);
  if (month < 1 || month > 12) return false;
  const now = new Date();
  return year > now.getFullYear() || (year === now.getFullYear() && month >= now.getMonth() + 1);
};

const validatePaymentForm = ({ tarjeta, expiracion, cvv }) => {
  const errors = {};
  if (!isValidCardNumber(tarjeta) || !getCardType(tarjeta))
    errors.tarjeta = "Ingresa una tarjeta Visa, Mastercard o American Express valida.";
  if (!isValidExpiration(expiracion))
    errors.expiracion = "Ingresa una fecha vigente en formato MM/AA.";
  if (!/^\d{3,4}$/.test(cvv))
    errors.cvv = "Ingresa un CVV de 3 o 4 digitos.";
  return errors;
};

const CheckoutPayment = ({ orden, descuento = 0, puntosUsados = 0, onBack }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { usarPuntos: usarPuntosActivo, usuarioId } = useSelector((state) => state.puntos);

  const [tarjeta, setTarjeta] = useState("");
  const [expiracion, setExpiracion] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const cardType = getCardType(tarjeta);

  const subtotalOrden = Array.isArray(orden?.detalles)
    ? orden.detalles.reduce((acc, d) => {
        const precio = d.precioUnitario ?? d.productoVariante?.producto?.precioFinal ?? 0;
        return acc + precio * (d.cantidad ?? 0);
      }, 0)
    : 0;

  const totalFinal = Math.max(0, subtotalOrden - descuento);

  const tieneProductos = Array.isArray(orden?.detalles) && orden.detalles.length > 0;

  const handleConfirmarPago = async () => {
    if (!tieneProductos) return;

    const validationErrors = validatePaymentForm({ tarjeta, expiracion, cvv });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setError("Revisa los datos de la tarjeta antes de confirmar el pago.");
      return;
    }

    setErrors({});
    setError("");
    setIsSubmitting(true);

    try {
      // 1. Si el usuario eligió usar puntos, los descontamos en el backend primero
      if (usarPuntosActivo && puntosUsados > 0 && usuarioId) {
        const puntosResult = await dispatch(
          usarPuntos({
            body: { usuarioId, puntosAUsar: puntosUsados, ordenId: orden.id },
            token,
          })
        );
        if (puntosResult.error) {
          setError("Error al aplicar los puntos. Intenta de nuevo.");
          setIsSubmitting(false);
          return;
        }
      }

      // 2. Procesamos el pago
      const result = await dispatch(procesarPago({
        body: {
          ordenId: orden.id,
          estado: "APROBADO",
          metodoPago: "TARJETA",
          descuento: descuento,
        },
        token,
      }));

      if (!procesarPago.fulfilled.match(result)) {
        console.error('Error procesando pago:', result.error);
        setError("Error al procesar el pago. Intentá de nuevo.");
        setIsSubmitting(false);
        return;
      }

      // 3. Refrescamos carrito y puntos
      await dispatch(fetchCarrito(token));
      await dispatch(fetchPuntosMe(token));

      // 4. Reseteamos el toggle de puntos en el store
      dispatch(resetPuntos());

      setShowSuccessMessage(true);
    } catch (e) {
      console.error("Error procesando pago:", e);
      setError("Error al procesar el pago. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoToOrders = () => {
    setShowSuccessMessage(false);
    navigate("/mis-pedidos");
  };

  return (
    <>
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

          {descuento > 0 && (
            <div className="rounded-2xl border border-[#CCFF00]/30 bg-[#0A0A0A] p-5 space-y-2 text-sm">
              <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-3">Resumen del descuento</p>
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>${subtotalOrden.toLocaleString('es-AR')}</span>
              </div>
              <div className="flex justify-between text-[#CCFF00]">
                <span>Descuento ({puntosUsados} pts × $50)</span>
                <span>-${descuento.toLocaleString('es-AR')}</span>
              </div>
              <div className="flex justify-between font-black text-white text-base border-t border-[#262626] pt-2">
                <span>Total a pagar</span>
                <span className="text-[#CCFF00]">${totalFinal.toLocaleString('es-AR')}</span>
              </div>
            </div>
          )}

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
            <p className="rounded-2xl border border-red-500/40 bg-red-500/10 px-5 py-4 text-sm font-bold text-red-400">
              {error}
            </p>
          )}

          <button
            className="mt-4 w-full rounded-2xl bg-[#CCFF00] py-5 font-black uppercase text-black transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
            onClick={handleConfirmarPago}
            disabled={isSubmitting || !tieneProductos}
          >
            {isSubmitting ? "Procesando..." : `Confirmar pago — $${totalFinal.toLocaleString('es-AR')}`}
          </button>
        </div>
      </div>

      {showSuccessMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6">
          <div className="w-full max-w-md rounded-3xl border border-[#CCFF00]/50 bg-[#111111] p-8 text-center shadow-2xl">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#CCFF00] text-black">
              <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-black uppercase text-white">Pago confirmado</h2>
            <p className="mt-4 text-sm text-gray-400">
              Tu compra se registro correctamente. Podes verla en tu historial de pedidos.
            </p>
            {descuento > 0 && (
              <p className="mt-2 text-sm text-[#CCFF00] font-bold">
                Usaste {puntosUsados} puntos y ahorraste ${descuento.toLocaleString('es-AR')}
              </p>
            )}
            <button
              onClick={handleGoToOrders}
              className="mt-8 w-full rounded-2xl bg-[#CCFF00] px-6 py-4 font-black uppercase text-black transition hover:bg-white"
            >
              Ver mis pedidos
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutPayment;
