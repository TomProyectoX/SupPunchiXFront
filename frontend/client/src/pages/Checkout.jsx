// Checkout.jsx

import { useEffect, useMemo, useRef, useState } from 'react';
import { useCart } from '../hooks/useCart';
import CheckoutAddressForm from '../assets/components/react/CheckoutAddressForm';
import CheckoutPayment from '../assets/components/react/CheckoutPayment';
import OrderSummary from '../assets/components/react/OrderSummary';
import { useAuth } from "../hooks/useAuth";
import { fetchWithAuth } from "../utils/fetchWithAuth";
import { useNavigate } from "react-router-dom";

const getProductoIdFromDetalle = (productoValue) => {
  if (productoValue == null) return null;
  if (typeof productoValue === 'object') {
    return productoValue.idProducto ?? productoValue.id ?? productoValue.productoId ?? null;
  }
  return productoValue;
};

const getSaborIdFromDetalle = (saborValue) => {
  if (saborValue == null) return null;
  if (typeof saborValue === 'object') {
    return saborValue.idSabor ?? saborValue.id ?? null;
  }
  return saborValue;
};

const mapOrdenToResumenItems = (orden, cartItems = []) =>
  Array.isArray(orden?.detalles)
    ? orden.detalles.map((detalle) => {
        const productoRef = detalle.productoVariante?.producto;
        const saborRef = detalle.productoVariante?.sabor;
        const idProducto = getProductoIdFromDetalle(productoRef);
        const idSabor = getSaborIdFromDetalle(saborRef);
        const productMatch = cartItems.find((item) => item.idProducto === idProducto);
        const cartMatch = cartItems.find(
          (item) => item.idProducto === idProducto && (item.idSabor ?? null) === (idSabor ?? null)
        );

        return {
          idDetalle: detalle.id,
          idProducto,
          nombre:
            (typeof productoRef === 'object' ? productoRef?.nombre : null) ||
            productMatch?.nombre ||
            cartMatch?.nombre ||
            '',
          sabor:
            (typeof saborRef === 'object' ? saborRef?.nombre : null) ||
            cartMatch?.sabor ||
            productMatch?.sabor ||
            cartMatch?.sabor ||
            '',
          cantidad: detalle.cantidad ?? 0,
          precio:
            detalle.precioUnitario ??
            productMatch?.precio ??
            cartMatch?.precio ??
            (typeof productoRef === 'object' ? productoRef?.precioFinal ?? productoRef?.precio ?? 0 : 0),
        };
      })
    : [];

const Checkout = () => {

  const navigate = useNavigate();
  const { token } = useAuth();
  const { cartItems } = useCart();
  const lastSyncedCartSignatureRef = useRef('');

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

  const buildDireccionPayload = (direccion) => ({
    direccion: {
      calle: direccion.calle.trim(),
      numero: direccion.numero.trim(),
      ciudad: direccion.ciudad.trim(),
      provincia: direccion.provincia.trim(),
      codigoPostal: direccion.codigoPostal.trim(),
    },
  });

  const buildCartSignature = (items) =>
    items
      .map((item) => `${item.idProducto}:${item.idSabor ?? '0'}:${item.cantidad}:${item.precio}`)
      .join('|');

  const crearOActualizarOrden = async (payload, cartSignature) => {
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

    lastSyncedCartSignatureRef.current = cartSignature;
    setOrden(data);
    setStep('pago');

    return data;
  };

  const hasOrdenEnCurso = Boolean(orden);

  const steps = ['Carrito', 'Entrega', 'Pago'];

  // si ya hay orden -> paso pago
  // si no -> paso entrega
  const currentStepIndex = hasOrdenEnCurso ? 2 : 1;

  const progress = (currentStepIndex / (steps.length - 1)) * 100;

  useEffect(() => {

    const loadOrdenEnCurso = async () => {

      try {

        console.log('[Checkout] Cargando orden en curso');

        const response = await fetchWithAuth(
          'http://localhost:4002/Ordenes/en-curso',
          { method: 'GET' },
          () => token,
          navigate
        );

        console.log('[Checkout] /Ordenes/en-curso status', response.status);

        // si no hay orden en curso devolves 204 o 404
        if (response.status === 204 || response.status === 404) {
          setLoading(false);
          return;
        }

        const data = await response.json();

        console.log('[Checkout] orden en curso raw', data);
        console.log('[Checkout] orden keys', Object.keys(data || {}));
        console.log('[Checkout] orden.detalles raw', data?.detalles);
        console.log('[Checkout] orden.detalles length', data?.detalles?.length ?? 0);
        console.log(
          '[Checkout] source items',
          Array.isArray(data?.detalles) ? 'detalles' : Array.isArray(data?.productos) ? 'productos' : 'ninguno'
        );

        if (!response.ok) {
          throw new Error('Error cargando orden');
        }

        setOrden(data);
        console.log('[Checkout] orden normalizada', mapOrdenToResumenItems(data));
        console.log(
          '[Checkout] orden.detalles mapped ids',
          Array.isArray(data?.detalles)
            ? data.detalles.map((detalle) => ({
                detalleId: detalle.id,
                productoVarianteId: detalle.productoVariante?.id ?? null,
                productoId: detalle.productoVariante?.producto?.idProducto ?? null,
                productoNombre: detalle.productoVariante?.producto?.nombre ?? '',
              }))
            : []
        );
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

  useEffect(() => {
    if (!orden || cartItems.length === 0) {
      return;
    }

    const cartSignature = buildCartSignature(cartItems);

    if (cartSignature === lastSyncedCartSignatureRef.current) {
      return;
    }

    const syncOrdenConCarrito = async () => {
      try {
        await crearOActualizarOrden(buildDireccionPayload(orden.direccion), cartSignature);
      } catch (e) {
        if (lastSyncedCartSignatureRef.current === cartSignature) {
          lastSyncedCartSignatureRef.current = '';
        }
        console.log(e);
      }
    };

    syncOrdenConCarrito();
  }, [orden, cartItems, navigate, token]);

  useEffect(() => {
    if (!orden) {
      return;
    }

    const resumen = mapOrdenToResumenItems(orden);
    console.log('[Checkout] orden render', {
      resumenCount: resumen.length,
      resumen,
    });
  }, [orden]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const payload = buildDireccionPayload(form);
    const cartSignature = buildCartSignature(cartItems);

    try {
      await crearOActualizarOrden(payload, cartSignature);

    } catch (e) {
      console.log(e);
    }
  };

  const resumenOrden = useMemo(() => mapOrdenToResumenItems(orden, cartItems), [orden, cartItems]);

  const totalOrden = useMemo(
    () =>
      resumenOrden.reduce(
        (acc, item) => acc + (Number(item.precio) || 0) * (Number(item.cantidad) || 0),
        0
      ),
    [resumenOrden]
  );

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
        items={resumenOrden}
        total={totalOrden}
      />

    </div>

  </div>

</div>
  );
};

export default Checkout;