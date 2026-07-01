import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutAddressForm from '../assets/components/react/CheckoutAddressForm';
import CheckoutPayment from '../assets/components/react/CheckoutPayment';
import OrderSummary from '../assets/components/react/OrderSummary';
import { fetchOrdenEnCurso, createOrden, deleteDetalleOrden } from '../../redux/ordenSlice';

const mapOrdenToResumenItems = (orden) =>
  Array.isArray(orden?.detalles)
    ? orden.detalles.map((detalle) => {
        const productoRef = detalle.productoVariante?.producto;
        const saborRef = detalle.productoVariante?.sabor;

        return {
          idDetalle: detalle.id,
          idVariante: detalle.productoVariante?.id ?? null,
          idProducto: productoRef?.idProducto ?? null,
          nombre: productoRef?.nombre ?? '',
          sabor: saborRef?.nombre ?? '',
          cantidad: detalle.cantidad ?? 0,
          precio: detalle.precioUnitario ?? productoRef?.precioFinal ?? productoRef?.precio ?? 0,
          esGratis: Number(detalle.precioUnitario ?? productoRef?.precioFinal ?? productoRef?.precio ?? 0) === 0,
        };
      })
    : [];

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { orden, loading } = useSelector((state) => state.orden);
  const { items: cartItems, cupon } = useSelector((state) => state.carrito);

  const [errorCheckout, setErrorCheckout] = useState("");

  const [form, setForm] = useState({
    calle: '',
    numero: '',
    ciudad: '',
    provincia: '',
    codigoPostal: '',
  });

  const [step, setStep] = useState('direccion');

  useEffect(() => {
    if (token) {
      dispatch(fetchOrdenEnCurso(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (orden) {
      setStep('pago');
      if (orden.direccion) {
        setForm({
          calle: orden.direccion.calle || '',
          numero: orden.direccion.numero || '',
          ciudad: orden.direccion.ciudad || '',
          provincia: orden.direccion.provincia || '',
          codigoPostal: orden.direccion.codigoPostal || '',
        });
      }
    }
  }, [orden?.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      direccion: {
        calle: form.calle.trim(),
        numero: form.numero.trim(),
        ciudad: form.ciudad.trim(),
        provincia: form.provincia.trim(),
        codigoPostal: form.codigoPostal.trim(),
      },
    };

    setErrorCheckout("");

    const result = await dispatch(createOrden({ body, token }));

    if (!createOrden.fulfilled.match(result)) {
      const msg = result.error?.message || "Error al crear la orden";
      setErrorCheckout(msg);
    }
  };

  const handleActualizarOrdenConCarrito = async () => {
    if (!orden?.direccion || (cartItems.length === 0 && cupon == null)) return;

    setErrorCheckout("");

    const body = {
      direccion: {
        calle: orden.direccion.calle,
        numero: orden.direccion.numero,
        ciudad: orden.direccion.ciudad,
        provincia: orden.direccion.provincia,
        codigoPostal: orden.direccion.codigoPostal,
      },
    };

    const result = await dispatch(createOrden({ body, token }));

    if (!createOrden.fulfilled.match(result)) {
      const msg = result.error?.message || "Error al actualizar la orden con los nuevos productos";
      setErrorCheckout(msg);
    }
  };

  const handleDeleteOrderDetail = async (detalle) => {
    setErrorCheckout("");
    const result = await dispatch(
      deleteDetalleOrden({ id: detalle.idDetalle, cantidad: detalle.cantidad, token })
    );
    if (!deleteDetalleOrden.fulfilled.match(result)) {
      setErrorCheckout(result.payload || result.error?.message || "No se pudo eliminar el producto de la orden");
    }
  };

  const resumenOrden = useMemo(() => {
    if (orden) return mapOrdenToResumenItems(orden);
    return cartItems.map((item) => ({
      idDetalle: item.idCartItem,
      idVariante: item.idVariante ?? null,
      idProducto: item.idProducto,
      nombre: item.nombre,
      sabor: item.sabor,
      cantidad: item.cantidad,
      precio: item.precio,
      esGratis: Number(item.precio || 0) === 0,
    }));
  }, [orden, cartItems]);

  const subtotalOrden = useMemo(
    () => resumenOrden.reduce((acc, item) => acc + (Number(item.precio) || 0) * (Number(item.cantidad) || 0), 0),
    [resumenOrden]
  );

  const descuentoCupon = useMemo(() => {
    const cuponActivo = orden?.cupon || cupon;
    if (cuponActivo?.descuento == null) return 0;
    return subtotalOrden * (Number(cuponActivo.descuento) || 0) / 100;
  }, [orden?.cupon, cupon, subtotalOrden]);

  const totalOrden = Math.max(subtotalOrden - descuentoCupon, 0);

  const hasOrdenEnCurso = Boolean(orden);

  const steps = [
    { label: 'Carrito', icon: 'shopping_bag' },
    { label: 'Entrega', icon: 'local_shipping' },
    { label: 'Pago', icon: 'credit_card' },
  ];

  const currentStepIndex = hasOrdenEnCurso ? 2 : 1;

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

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#CCFF00] blur-[200px] opacity-[0.05] pointer-events-none" />

      <div className="relative z-10 max-w-[1600px] mx-auto">

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

        {/* AVISO DE PRODUCTOS NUEVOS EN EL CARRITO, FUERA DE LA ORDEN */}
        {hasOrdenEnCurso && (cartItems.length > 0 || cupon != null) && (
          <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-[#CCFF00]/30 bg-[#CCFF00]/5 p-4">
            <div className="text-sm text-[#CCFF00] font-bold">
              {cartItems.length > 0 && (
                <p>Tenés {cartItems.length} producto(s) nuevo(s) en el carrito que todavía no están en tu orden.</p>
              )}
              {cupon != null && (
                <p>Tenés un cupón activo que no se aplicó a tu orden.</p>
              )}
            </div>
            <button
              onClick={handleActualizarOrdenConCarrito}
              className="bg-[#CCFF00] text-black px-4 py-2 rounded-lg text-xs font-black uppercase whitespace-nowrap hover:bg-white transition"
            >
              Agregar a la orden
            </button>
          </div>
        )}

        {errorCheckout && (
          <div className="mb-6">
            <div className="bg-red-500/10 border border-red-500 rounded-lg px-5 py-3 text-red-400 font-bold text-sm">
              {errorCheckout}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">

          <div className="lg:col-span-7">
            {step === 'direccion' ? (
              <CheckoutAddressForm
                form={form}
                onChange={handleChange}
                onSubmit={handleSubmit}
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
              subtotal={subtotalOrden}
              descuentoCupon={descuentoCupon}
              total={totalOrden}
              cupon={orden?.cupon || cupon}
              onDeleteDetail={orden ? handleDeleteOrderDetail : undefined}
            />
          </div>

        </div>

      </div>

    </div>
  );
};

export default Checkout;
