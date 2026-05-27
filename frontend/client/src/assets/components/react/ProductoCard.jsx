import { Link } from "react-router-dom";

const getImageSrc = (imageValue) => {
  if (!imageValue) {
    return "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/nrx/nrx02992/y/8.jpg";
  }

  if (typeof imageValue === 'object') {
    const imageFile = imageValue.file || imageValue.base64 || imageValue.data || imageValue.src || imageValue.url;

    if (typeof imageFile === 'string' && imageFile.length > 0) {
      if (imageFile.startsWith('data:')) {
        return imageFile;
      }

      if (imageFile.startsWith('http://') || imageFile.startsWith('https://')) {
        return imageFile;
      }

      return `data:image/jpeg;base64,${imageFile}`;
    }

    return "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/nrx/nrx02992/y/8.jpg";
  }

  if (imageValue.startsWith("data:")) {
    return imageValue;
  }

  if (imageValue.startsWith("http://") || imageValue.startsWith("https://")) {
    return imageValue;
  }

  return `data:image/jpeg;base64,${imageValue}`;
};

const ProductoCard = ({ producto, featured = false }) => {
  if (!producto) return null;

  // ===== PROMO =====
  const tienePromo =
    producto.promo !== null &&
    producto.promo !== undefined;

  const descuento = tienePromo
    ? Number(producto.promo.discount || 0)
    : 0;

  const precioOriginal = Number(producto.precio || 0);

  const precioFinal = tienePromo
    ? precioOriginal - (precioOriginal * descuento) / 100
    : precioOriginal;

  // ===== CATEGORIA =====
  const categoria =
    producto.categoria?.description || "Sin categoría";

  // ===== SABORES =====
  const sabores =
    producto.variantes?.map(
      (variante) => variante.sabor?.nombre
    ) || [];

  return (
    <Link
      to={`/product/${producto.idProducto}`}
      className="block w-full"
    >
      <div className={`bg-[#141414] border-l-2 ${tienePromo ? "border-[#CCFF00]" : "border-[#3a3a3a]"} flex flex-col group cursor-pointer transition-all duration-300 hover:bg-[#1F1F1F] overflow-hidden h-full`}>

        {/* IMAGEN */}
        <div className="relative overflow-hidden bg-[#0A0A0A] h-[220px]">

          <img
            src={getImageSrc(producto.imagen)}
            alt={producto.nombre}
            className="w-full h-full object-contain p-6 grayscale group-hover:grayscale-0 transition-all duration-500"
            onError={(e) => {
              e.target.src =
                "https://static.vecteezy.com/system/resources/previews/015/656/605/non_2x/prohibited-flat-greyscale-icon-vector.jpg";
            }}
          />

          {/* ETIQUETA PROMO */}
          {tienePromo && (
            <div className="absolute top-4 left-0 bg-[#CCFF00] text-black px-3 py-1 font-black text-[10px] uppercase tracking-wider">
              {descuento}% OFF
            </div>
          )}

          {/* BOTON */}
          <button className="absolute bottom-4 right-4 bg-white p-3 rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="material-symbols-outlined text-black">
              shopping_bag
            </span>
          </button>

        </div>

        {/* INFO */}
        <div className="p-6 space-y-4 flex flex-col flex-grow">

          {/* CATEGORIA + PRECIO */}
          <div className="flex justify-between items-start gap-4">

            <div>
              <p className="text-[10px] text-[#CCFF00] uppercase font-black tracking-widest">
                {categoria}
              </p>
            </div>

            <div className="text-right">

              {tienePromo && (
                <p className="text-sm text-gray-500 line-through font-bold">
                  $
                  {precioOriginal.toLocaleString("es-AR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              )}

              <p className="text-2xl text-white font-black tracking-tight">
                $
                {precioFinal.toLocaleString("es-AR", {
                  minimumFractionDigits: 2,
                })}
              </p>

            </div>

          </div>

          {/* NOMBRE */}
          <h3 className="text-xl uppercase leading-tight text-white font-black tracking-tight">
            {producto.nombre}
          </h3>

          {/* SABORES */}
          <div className="flex flex-wrap gap-2 mt-auto">

            {sabores.length > 0 ? (
              sabores.map((sabor, index) => (
                <span
                  key={index}
                  className="font-black text-[10px] uppercase bg-black border border-[#262626] text-white px-2 py-1 tracking-wide"
                >
                  {sabor}
                </span>
              ))
            ) : (
              <span className="font-black text-[10px] uppercase bg-black border border-[#262626] text-gray-400 px-2 py-1">
                SIN SABOR
              </span>
            )}

          </div>

        </div>

      </div>
    </Link>
  );
};

export default ProductoCard;