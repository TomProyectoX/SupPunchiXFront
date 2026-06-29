export default function CuponList({ cupones }) {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-black mb-6">Cupones creados</h2>

      <div className="flex flex-col gap-4">
        {cupones.length === 0 ? (
          <p className="text-gray-400">No hay cupones creados.</p>
        ) : (
          cupones.map((cupon) => (
            <div
              key={cupon.id}
              className="flex items-center justify-between rounded-xl border border-gray-700 bg-black p-5"
            >
              <div>
                <p className="font-bold text-lg">
                  {cupon.descuento != null
                    ? `${cupon.descuento}% OFF`
                    : "Productos gratis"}
                </p>
                <p className="text-gray-400">
                  Costo: {cupon.costo} puntos
                </p>
                {cupon.productos && cupon.productos.length > 0 && (
                  <p className="text-sm text-gray-500 mt-2">
                    Productos:{" "}
                    {cupon.productos
                      .map((p) => p.producto?.nombre || "Producto")
                      .join(", ")}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
