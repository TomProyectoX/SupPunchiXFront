import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchWithAuth } from '../utils/fetchWithAuth';

const formatCurrency = (value) =>
  Number(value || 0).toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  });

const formatDate = (value) => {
  if (!value) return 'Fecha no disponible';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const normalizeOrders = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.ordenes)) return data.ordenes;
  if (Array.isArray(data.data)) return data.data;
  if (Array.isArray(data.result)) return data.result;
  if (data.id || data.numeroOrden || data.idOrden || data.orderId) return [data];
  return [];
};

const getOrderNumber = (order) =>
  order.numeroOrden || order.id || order.orderId || order.idOrden || 'Sin número';

const normalizeOrderStatus = (value) => {
  if (value == null) return null;
  const normalized = String(value).trim().toLowerCase();

  if (['aprobado', 'pagado', 'paid', 'pago confirmado', 'pago aprobado'].includes(normalized)) {
    return 'Pagada';
  }
  if (['en_curso', 'en curso', 'en-proceso', 'en proceso', 'pendiente de pago', 'processing'].includes(normalized)) {
    return 'En curso';
  }
  if (['pendiente', 'pending'].includes(normalized)) {
    return 'Pendiente';
  }
  if (['cancelado', 'cancelada', 'canceled', 'cancelled'].includes(normalized)) {
    return 'Cancelada';
  }

  return String(value);
};

const getOrderStatus = (order) => {
  const statusCandidates = [
    order.estadoPago,
    order.estado,
    order.status,
    order.estatus,
    order.paymentStatus,
    order.pago?.estado,
    order.pago?.estadoPago,
    order.pago?.status,
    order.pago?.estatus,
    order.orderStatus,
  ];

  for (const candidate of statusCandidates) {
    const mapped = normalizeOrderStatus(candidate);
    if (mapped) return mapped;
  }

  return 'Pendiente';
};

const getOrderTotal = (order) => {
  const explicitTotal =
    order.total || order.totalPagar || order.precioTotal || order.importe || order.montoTotal ||
    order.subTotal || order.totalAPagar;

  if (explicitTotal && Number(explicitTotal) !== 0) {
    return explicitTotal;
  }

  const items = extractOrderItems(order);
  return items.reduce(
    (sum, item) => sum + Number(item.precio || 0) * Number(item.cantidad || 0),
    0
  );
};

const getOrderDate = (order) =>
  order.fecha || order.fechaCreacion || order.fechaPedido || order.createdAt || order.updatedAt || null;

const extractOrderItems = (order) => {
  const details =
    Array.isArray(order.detalles) ? order.detalles :
    Array.isArray(order.productos) ? order.productos :
    Array.isArray(order.items) ? order.items :
    [];

  return details.map((detalle, index) => {
    const producto =
      detalle.productoVariante?.producto ||
      detalle.producto ||
      detalle.productoVariante ||
      {};

    const sabor =
      detalle.productoVariante?.sabor ||
      detalle.sabor ||
      detalle.saborSeleccionado ||
      {};

    return {
      id:
        detalle.id ||
        detalle.idDetalle ||
        `${producto.id ?? producto.idProducto ?? 'producto'}-${sabor.id ?? 'sabor'}-${index}`,
      nombre: producto.nombre || detalle.nombre || 'Producto',
      sabor: sabor.nombre || detalle.sabor || '',
      cantidad: detalle.cantidad ?? detalle.cantidadProducto ?? 1,
      precio:
        detalle.precioUnitario ||
        detalle.precio ||
        detalle.valor ||
        producto.precioFinal ||
        producto.precio ||
        0,
    };
  });
};

const OrderHistory = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await fetchWithAuth(
          'http://localhost:4002/Ordenes',
          { method: 'GET' },
          () => token,
          navigate
        );

        if (response.status === 204) {
          setOrders([]);
          return;
        }

        const data = await response.json().catch(() => null);
        setOrders(normalizeOrders(data));
      } catch (err) {
        setError(err.message || 'No se pudo cargar el historial de pedidos.');
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [navigate, token]);

  return (
    <div className="min-h-[calc(100vh-88px)] py-12 px-6 lg:px-12 bg-[#050505] text-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#CCFF00]">Historial</p>
            <h1 className="text-5xl font-black uppercase mt-3">Mis pedidos</h1>
            <p className="text-gray-400 mt-3">Aquí podés ver tus compras confirmadas y el detalle de cada pedido.</p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center rounded-3xl border border-[#CCFF00] bg-[#111111] px-6 py-3 text-sm font-black uppercase tracking-widest text-[#CCFF00] transition hover:bg-[#CCFF00] hover:text-black"
          >
            Volver a Home
          </button>
        </div>

        {loading && (
          <div className="rounded-3xl border border-[#262626] bg-[#111111] p-8 text-gray-300">
            Cargando pedidos...
          </div>
        )}

        {error && (
          <div className="rounded-3xl border border-red-500 bg-[#111111] p-8 text-red-300">
            {error}
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="rounded-3xl border border-[#262626] bg-[#111111] p-10 text-gray-300">
            No se encontraron pedidos en tu historial.
          </div>
        )}

        <div className="space-y-6">
          {orders.map((order) => {
            const items = extractOrderItems(order);
            return (
              <div key={getOrderNumber(order)} className="rounded-3xl border border-[#262626] bg-[#111111] p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Pedido</p>
                    <h2 className="text-2xl font-black uppercase mt-2">{getOrderNumber(order)}</h2>
                    <p className="text-sm text-gray-400 mt-2">Estado: <span className="text-[#CCFF00]">{getOrderStatus(order)}</span></p>
                  </div>

                  <div className="text-left md:text-right">
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Total</p>
                    <p className="text-3xl font-black text-[#CCFF00] mt-2">{formatCurrency(getOrderTotal(order))}</p>
                    <p className="text-xs text-gray-500 mt-2">{formatDate(getOrderDate(order))}</p>
                  </div>
                </div>

                <div className="mt-6 border-t border-[#262626] pt-6 space-y-4">
                  {items.length === 0 ? (
                    <p className="text-sm text-gray-400">No hay detalles disponibles para este pedido.</p>
                  ) : (
                    items.map((item) => (
                      <div key={item.id} className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-8">
                          <p className="text-xs uppercase text-gray-500">{item.sabor || 'Sabor'}</p>
                          <p className="text-sm font-black uppercase">{item.nombre}</p>
                          <p className="text-xs text-gray-400 mt-1">Cantidad: {item.cantidad}</p>
                        </div>
                        <div className="col-span-4 text-right">
                          <p className="text-sm font-black text-[#CCFF00]">{formatCurrency(item.precio)}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
