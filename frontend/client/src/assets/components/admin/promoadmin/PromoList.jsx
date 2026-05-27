export default function PromoList({
  promos,
  handleDeletePromo,
  handleSelectPromoToEdit,
}) {

  return (
    <div className="mt-10">

      <h2 className="text-2xl font-black mb-6">
        Promos creadas
      </h2>

      <div className="flex flex-col gap-4">

        {promos.map((promo) => (

          <div
            key={promo.id}
            className="
              flex items-center justify-between
              rounded-xl border border-gray-700
              bg-black p-5
            "
          >

            <div>

              <p className="font-bold text-lg">
                {promo.description}
              </p>

              <p className="text-gray-400">
                {promo.discount}% OFF
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Productos:
                {" "}
                {promo.productos
                  ?.map((p) => p.nombre)
                  .join(", ")}
              </p>

            </div>

            <div className="flex gap-3">

              <button
                onClick={() =>
                  handleSelectPromoToEdit(promo)
                }
                className="
                  rounded-lg bg-blue-500
                  px-4 py-2 font-bold
                "
              >
                Editar
              </button>

              <button
                onClick={() =>
                  handleDeletePromo(promo.id)
                }
                className="
                  rounded-lg bg-red-500
                  px-4 py-2 font-bold
                "
              >
                Eliminar
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}