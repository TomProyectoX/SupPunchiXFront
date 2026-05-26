// Checkout.jsx

import { useEffect, useMemo, useState } from 'react';
import { useCart } from '../hooks/useCart';
import CheckoutAddressForm from '../assets/components/react/CheckoutAddressForm';
import CheckoutPayment from '../assets/components/react/CheckoutPayment';
import OrderSummary from '../assets/components/react/OrderSummary';
import { useAuth } from "../hooks/useAuth";
import { fetchWithAuth } from "../utils/fetchWithAuth";
import { useNavigate } from "react-router-dom";

const Checkout = () => {

  const navigate = useNavigate();
  const { token } = useAuth();
  const { cartItems, subtotal } = useCart();

  const [form, setForm] = useState({
    calle: '',
    numero: '',
    ciudad: '',
    provincia: '',
    codigoPostal: '',
  });

  const [orden, setOrden] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(orden ? 'pago' : 'direccion');

  const hasOrdenEnCurso = Boolean(orden);

  const steps = ['Carrito', 'Entrega', 'Pago'];

  // si ya hay orden -> paso pago
  // si no -> paso entrega
  const currentStepIndex = hasOrdenEnCurso ? 2 : 1;

  const progress = (currentStepIndex / (steps.length - 1)) * 100;

  useEffect(() => {

    const loadOrdenEnCurso = async () => {

      try {

        const response = await fetchWithAuth(
          'http://localhost:4002/Ordenes/en-curso',
          { method: 'GET' },
          () => token,
          navigate
        );

        // si no hay orden en curso devolves 204 o 404
        if (response.status === 204 || response.status === 404) {
          setLoading(false);
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error('Error cargando orden');
        }

        setOrden(data);
        if (data) {
        setStep('pago');
            }

      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    loadOrdenEnCurso();

  }, []);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const payload = {
      direccion: {
        calle: form.calle.trim(),
        numero: form.numero.trim(),
        ciudad: form.ciudad.trim(),
        provincia: form.provincia.trim(),
        codigoPostal: form.codigoPostal.trim(),
      },
    };

    try {

      const response = await fetchWithAuth(
        'http://localhost:4002/Ordenes',
        {
          method: 'POST',
          body: JSON.stringify(payload)
        },
        () => token,
        navigate
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error('Error creando orden');
      }

      setOrden(data);
     
    setStep('pago');

    } catch (e) {
      console.log(e);
    }
  };

  const total = useMemo(() => subtotal, [subtotal]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-white">
        Cargando checkout...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-28 px-6 pb-16">

  <div className="max-w-[1600px] mx-auto">

    <div className="mb-10">

      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-gray-500">

        {steps.map((step, index) => (
          <span
            key={step}
            className={index === currentStepIndex ? 'text-[#CCFF00]' : ''}
          >
            {step}
          </span>
        ))}

      </div>

      <div className="mt-4 h-[2px] bg-[#262626] relative">

        <div
          className="absolute left-0 top-0 h-[2px] bg-[#CCFF00]"
          style={{ width: `${progress}%` }}
        />

      </div>

    </div>

  </div>

  {/* MÁS ESPACIO ENTRE COLUMNAS */}
  <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14">

    <div className="lg:col-span-7">

      {step === 'direccion' ? (

        <CheckoutAddressForm
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isDisabled={Boolean(orden)}
        />

      ) : (

        <CheckoutPayment
          orden={orden}
          onBack={() => setStep('direccion')}
        />

      )}

    </div>

    {/* le agregamos margin top para separarlo un poco */}
    <div className="lg:col-span-5 lg:pl-4">

      <OrderSummary
        cartItems={cartItems}
        total={total}
      />

    </div>

  </div>

</div>
  );
};

export default Checkout;