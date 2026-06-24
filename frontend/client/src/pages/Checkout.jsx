import { useEffect, useMemo, useRef, useState } from 'react';
import { useCart } from '../hooks/useCart';
import CheckoutAddressForm from '../assets/components/react/CheckoutAddressForm';
import CheckoutPayment from '../assets/components/react/CheckoutPayment';
import OrderSummary from '../assets/components/react/OrderSummary';
import { useSelector } from "react-redux";
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
  const { token } = useSelector((state) => state.auth);
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

  const steps = [
    { label: 'Carrito', icon: 'shopping_bag' },
    { label: 'Entrega', icon: 'local_shipping' },
    { label: 'Pago', icon: 'credit_card' },
  ];

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

  const handleDeleteOrderDetail = async (detalle) => {
    const idDetalleOrden = detalle.idDetalle;
    const cantidadTotalDetalle = detalle.cantidad;
    try {
      const response = await fetchWithAuth(
        `http://localhost:4002/Ordenes/${idDetalleOrden}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cantidad: cantidadTotalDetalle }),
        },
        () => token,
        navigate
      );

      if (!response.ok) {
        const errBody = await response.text().catch(() => null);
        throw new Error(`Eliminar detalle fallo: ${response.status} ${errBody ?? ''}`);
      }

      setOrden((prev) =>
        prev ? { ...prev, detalles: (prev.detalles || []).filter((d) => d.id !== idDetalleOrden) } : prev
      );
    } catch (e) {
      console.error('[Checkout] delete detail error', e);
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
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#CCFF00] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm uppercase tracking-widest text-gray-400 font-black">Cargando checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-white pt-28 px-6 pb-16 overflow-hidden">

      {/* GLOW DE FONDO */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#CCFF00] blur-[200px] opacity-[0.05] pointer-events-none" />

      <div className="relative z-10 max-w-[1600px] mx-auto">

        {/* STEPPER */}
        <div className="mb-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#CCFF00] transition uppercase font-black mb-8 group"
        >
          <span className="material-symbols-outlined text-base transition-transform group-hover:-translate-x-1">arrow_back</span>
          Volver
        </button>

        <div className="flex items-center justify-between">
          {steps.map((s, index) => {
            const isActive = index === currentStepIndex;
            const isDone = index < currentStepIndex;
            return (
              <div key={s.label} className="flex items-center gap-2 flex-1">
                <div
                  className={`flex items-center justify-center w-9 h-9 rounded-full border-2 flex-shrink-0 transition-colors ${
                    isActive
                      ? "bg-[#CCFF00] border-[#CCFF00] text-black"
                      : isDone
                      ? "bg-[#CCFF00]/10 border-[#CCFF00] text-[#CCFF00]"
                      : "bg-[#141414] border-[#262626] text-gray-500"
                  }`}
                >
                  <span className="material-symbols-outlined text-base">{s.icon}</span>
                </div>
                <span
                  className={`text-xs uppercase tracking-[0.2em] font-black hidden sm:inline ${
                    isActive || isDone ? "text-[#CCFF00]" : "text-gray-500"
                  }`}
                >
                  {s.label}
                </span>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-[2px] bg-[#262626] mx-2 relative overflow-hidden rounded-full">
                    <div
                      className="absolute left-0 top-0 h-full bg-[#CCFF00] transition-all duration-500"
                      style={{ width: index < currentStepIndex ? "100%" : "0%" }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">

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

          <div className="lg:col-span-5">

            <OrderSummary
              items={resumenOrden}
              total={totalOrden}
              onDeleteDetail={handleDeleteOrderDetail}
            />

          </div>

        </div>

      </div>

    </div>
  );
};

export default Checkout;