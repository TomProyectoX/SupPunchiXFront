import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutAddressForm from '../assets/components/react/CheckoutAddressForm';
import CheckoutPayment from '../assets/components/react/CheckoutPayment';
import OrderSummary from '../assets/components/react/OrderSummary';
import { fetchOrdenEnCurso, createOrden, deleteDetalleOrden } from '../../redux/ordenSlice';
import { fetchCarrito } from '../../redux/carritoSlice';

const mapOrdenToResumenItems = (orden) =>
  Array.isArray(orden?.detalles)
    ? orden.detalles.map((detalle) => {
        const productoRef = detalle.productoVariante?.producto;
        const saborRef = detalle.productoVariante?.sabor;

        return {
          idDetalle: detalle.id,
          idProducto: productoRef?.idProducto ?? null,
          nombre: productoRef?.nombre ?? '',
          sabor: saborRef?.nombre ?? '',
          cantidad: detalle.cantidad ?? 0,
          precio: productoRef?.precioFinal ?? detalle.precioUnitario ?? productoRef?.precio ?? 0,
        };
      })
    : [];

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { orden, loading } = useSelector((state) => state.orden);
  const { items: cartItems } = useSelector((state) => state.carrito);

  const [errorCheckout, setErrorCheckout] = useState('');

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
      dispatch(fetchCarrito(token));
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

    setErrorCheckout('');
    try {
      await dispatch(createOrden({ body, token })).unwrap();
      await dispatch(fetchCarrito(token));
    } catch (e) {
      const msg = typeof e === 'string' ? e : e?.message || 'Error al crear la orden';
      setErrorCheckout(msg);
    }
  };

  const handleDeleteOrderDetail = (detalle) => {
    dispatch(deleteDetalleOrden({ id: detalle.idDetalle, cantidad: detalle.cantidad, token }));
  };

  const resumenOrden = useMemo(() => mapOrdenToResumenItems(orden), [orden]);
  const displayItems = step === 'direccion' ? cartItems : resumenOrden;

  const totalOrden = useMemo(
    () => displayItems.reduce((acc, item) => acc + (Number(item.precio) || 0) * (Number(item.cantidad) || 0), 0),
    [displayItems]
  );

  const hasOrdenEnCurso = Boolean(orden);
  const steps = ['Carrito', 'Entrega', 'Pago'];
  const currentStepIndex = hasOrdenEnCurso ? 2 : 1;
  const progress = (currentStepIndex / (steps.length - 1)) * 100;

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
            {steps.map((s, index) => (
              <span key={s} className={index === currentStepIndex ? 'text-[#CCFF00]' : ''}>
                {s}
              </span>
            ))}
          </div>
          <div className="mt-4 h-[2px] bg-[#262626] relative">
            <div className="absolute left-0 top-0 h-[2px] bg-[#CCFF00]" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {errorCheckout && (
        <div className="max-w-[1600px] mx-auto mb-6">
          <div className="bg-red-500/10 border border-red-500 rounded-lg px-5 py-3 text-red-400 font-bold text-sm">
            {errorCheckout}
          </div>
        </div>
      )}

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14">
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

        <div className="lg:col-span-5 lg:pl-4">
          <OrderSummary
            items={displayItems}
            total={totalOrden}
            onDeleteDetail={step === 'pago' ? handleDeleteOrderDetail : undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
