const OrderSummary = ({ cartItems, total }) => {

  return (

    <div className="rounded-2xl border border-[#262626] bg-[#111111] p-6">

      <h2 className="text-sm uppercase text-gray-400">
        Tu carrito
      </h2>

      <div className="mt-4 space-y-4">

        {cartItems.length === 0 ? (

          <p className="text-sm text-gray-400">
            No hay productos en el carrito.
          </p>

        ) : (

          cartItems.map((item) => (

            <div
              key={`${item.idProducto}-${item.idSabor ?? 0}`}
              className="flex items-center justify-between border-b border-[#262626] pb-3"
            >

              <div>

                <p className="text-xs uppercase text-gray-400">
                  {item.sabor || 'Sabor'}
                </p>

                <p className="text-sm font-black uppercase">
                  {item.nombre || 'Producto'}
                </p>

                <p className="text-xs text-gray-500">
                  Cantidad: {item.cantidad || 0}
                </p>

              </div>

              <span className="text-sm font-black text-[#CCFF00]">
                ${Number(item.precio || 0).toLocaleString('es-AR')}
              </span>

            </div>

          ))

        )}

        <div className="flex items-center justify-between pt-2">

          <span className="text-sm text-gray-400">
            Total
          </span>

          <span className="text-2xl font-black text-[#CCFF00]">
            ${Number(total || 0).toLocaleString('es-AR')}
          </span>

        </div>

      </div>

    </div>
  );
};

export default OrderSummary;