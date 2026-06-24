import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { procesarPago } from "../../../../redux/ordenSlice";
import { fetchCarrito } from "../../../../redux/carritoSlice";

const CARD_NUMBER_MAX_LENGTH = 16;

const sanitizeCardNumber = (value) => value.replace(/\D/g, "").slice(0, CARD_NUMBER_MAX_LENGTH);

const formatCardNumber = (value) =>
  sanitizeCardNumber(value)
    .replace(/(.{4})/g, "$1 ")
    .trim();

const formatExpiration = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 4);

  if (digits.length <= 2) {
    return digits;
  }

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

  if (digits.length < 13 || digits.length > CARD_NUMBER_MAX_LENGTH) {
    return false;
  }

  let sum = 0;
  let shouldDouble = false;

  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let digit = Number(digits[i]);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
};

const isValidExpiration = (value) => {
  const match = value.match(/^(\d{2})\/(\d{2})$/);

  if (!match) {
    return false;
  }

  const month = Number(match[1]);
  const year = Number(`20${match[2]}`);

  if (month < 1 || month > 12) {
    return false;
  }

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  return year > currentYear || (year === currentYear && month >= currentMonth);
};

const validatePaymentForm = ({ tarjeta, expiracion, cvv }) => {
  const errors = {};

  if (!isValidCardNumber(tarjeta) || !getCardType(tarjeta)) {
    errors.tarjeta = "Ingresa una tarjeta Visa, Mastercard o American Express valida.";
  }

  if (!isValidExpiration(expiracion)) {
    errors.expiracion = "Ingresa una fecha vigente en formato MM/AA.";
  }

  if (!/^\d{3,4}$/.test(cvv)) {
    errors.cvv = "Ingresa un CVV de 3 o 4 digitos.";
  }

  return errors;
};

const CheckoutPayment = ({ orden, onBack }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [tarjeta, setTarjeta] = useState("");
  const [expiracion, setExpiracion] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const cardType = getCardType(tarjeta);

  const handleConfirmarPago = async () => {
    const validationErrors = validatePaymentForm({ tarjeta, expiracion, cvv });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setError("Revisa los datos de la tarjeta antes de confirmar el pago.");
      return;
    }

    setErrors({});
    setError("");

    const body = {
      ordenId: orden.id,
      estado: "APROBADO",
      metodoPago: "TARJETA",
    };

    try {
      setIsSubmitting(true);
      await dispatch(procesarPago({ body, token })).unwrap();
      await dispatch(fetchCarrito(token));
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
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#CCFF00]">Paso final</p>
            <h1 className="mt-2 text-5xl font-black uppercase">Pago</h1>
          </div>
          <button
            onClick={onBack}
            className="rounded-xl border border-[#2A2A2A] px-5 py-3 text-sm uppercase tracking-wider transition hover:border-[#CCFF00]"
          >
            Editar direccion
          </button>
        </div>

        <div className="space-y-8">
          <div className="rounded-2xl border border-[#262626] bg-black p-6">
            <p className="mb-5 text-xs uppercase tracking-[0.25em] text-gray-500">Direccion de entrega</p>
            <div className="space-y-3 text-sm">
              <p>{orden?.direccion?.calle} {orden?.direccion?.numero}</p>
              <p>{orden?.direccion?.ciudad}</p>
              <p>{orden?.direccion?.provincia}</p>
              <p>{orden?.direccion?.codigoPostal}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="mb-3 flex items-center justify-between gap-4">
                <label className="block text-xs uppercase tracking-[0.25em] text-gray-400">Numero de tarjeta</label>
                {cardType && (
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-[#CCFF00]">
                    {cardType}
                  </span>
                )}
              </div>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="4242 4242 4242 4242"
                value={tarjeta}
                onChange={(e) => {
                  setTarjeta(formatCardNumber(e.target.value));
                  setErrors((prev) => ({ ...prev, tarjeta: "" }));
                  setError("");
                }}
                className={`w-full rounded-2xl border bg-black px-5 py-5 outline-none focus:border-[#CCFF00] ${
                  errors.tarjeta ? "border-red-500" : "border-[#262626]"
                }`}
              />
              {errors.tarjeta && <p className="mt-2 text-sm font-bold text-red-400">{errors.tarjeta}</p>}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="mb-3 block text-xs uppercase tracking-[0.25em] text-gray-400">Expiracion</label>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  placeholder="MM/AA"
                  value={expiracion}
                  onChange={(e) => {
                    setExpiracion(formatExpiration(e.target.value));
                    setErrors((prev) => ({ ...prev, expiracion: "" }));
                    setError("");
                  }}
                  className={`w-full rounded-2xl border bg-black px-5 py-5 outline-none focus:border-[#CCFF00] ${
                    errors.expiracion ? "border-red-500" : "border-[#262626]"
                  }`}
                />
                {errors.expiracion && <p className="mt-2 text-sm font-bold text-red-400">{errors.expiracion}</p>}
              </div>

              <div>
                <label className="mb-3 block text-xs uppercase tracking-[0.25em] text-gray-400">CVV</label>
                <input
                  type="password"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => {
                    setCvv(e.target.value.replace(/\D/g, "").slice(0, 4));
                    setErrors((prev) => ({ ...prev, cvv: "" }));
                    setError("");
                  }}
                  className={`w-full rounded-2xl border bg-black px-5 py-5 outline-none focus:border-[#CCFF00] ${
                    errors.cvv ? "border-red-500" : "border-[#262626]"
                  }`}
                />
                {errors.cvv && <p className="mt-2 text-sm font-bold text-red-400">{errors.cvv}</p>}
              </div>
            </div>

            {error && (
              <p className="rounded-2xl border border-red-500/40 bg-red-500/10 px-5 py-4 text-sm font-bold text-red-400">
                {error}
              </p>
            )}

            <button
              className="mt-4 w-full rounded-2xl bg-[#CCFF00] py-5 font-black uppercase text-black transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
              onClick={handleConfirmarPago}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Procesando..." : "Confirmar pago"}
            </button>
          </div>
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
