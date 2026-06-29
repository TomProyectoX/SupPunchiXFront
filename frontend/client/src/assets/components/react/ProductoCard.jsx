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

const ProductoCard = ({ producto }) => {
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
      <div className="bg-[#141414] rounded-xl flex flex-col group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(204,255,0,0.15)] overflow-hidden h-full border border-[#222222] hover:border-[#333333]">

        {/* IMAGEN */}
        <div className="relative overflow-hidden bg-gradient-to-b from-[#1A1A1A] to-[#0D0D0D] h-[240px]">

          <img
            src={getImageSrc(producto.imagen)}
            alt={producto.nombre}
            className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.src =
                "https://static.vecteezy.com/system/resources/previews/015/656/605/non_2x/prohibited-flat-greyscale-icon-vector.jpg";
            }}
          />

          {/* ETIQUETA PROMO */}
          {tienePromo && (
            <div className="absolute top-3 left-3 bg-[#CCFF00] text-black px-3 py-1.5 rounded-full font-black text-[11px] uppercase tracking-wider shadow-lg">
              -{descuento}%
            </div>
          )}

          {/* BOTON */}
          <button className="absolute bottom-4 right-4 bg-[#CCFF00] p-3 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:bg-white">
            <span className="material-symbols-outlined text-black text-[20px] block">
              shopping_bag
            </span>
          </button>

        </div>

        {/* INFO */}
        <div className="p-5 space-y-3 flex flex-col flex-grow">

          {/* CATEGORIA */}
          <p className="text-[10px] text-[#CCFF00] uppercase font-black tracking-widest">
            {categoria}
          </p>

          {/* NOMBRE */}
          <h3 className="text-lg uppercase leading-tight text-white font-black tracking-tight min-h-[2.5rem] line-clamp-2">
            {producto.nombre}
          </h3>

          {/* SABORES */}
          <div className="flex flex-wrap gap-1.5">
            {sabores.length > 0 ? (
              sabores.slice(0, 3).map((sabor, index) => (
                <span
                  key={index}
                  className="font-bold text-[10px] uppercase bg-[#0A0A0A] border border-[#2A2A2A] text-gray-400 px-2 py-1 rounded-md tracking-wide"
                >
                  {sabor}
                </span>
              ))
            ) : (
              <span className="font-bold text-[10px] uppercase bg-[#0A0A0A] border border-[#2A2A2A] text-gray-500 px-2 py-1 rounded-md">
                SIN SABOR
              </span>
            )}
          </div>

          {/* PRECIO */}
          <div className="flex items-end justify-between pt-2 mt-auto border-t border-[#222222]">
            <div>
              {tienePromo && (
                <p className="text-xs text-gray-500 line-through font-medium leading-none mb-1">
                  $
                  {precioOriginal.toLocaleString("es-AR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              )}
              <p className="text-2xl text-white font-black tracking-tight leading-none">
                $
                {precioFinal.toLocaleString("es-AR", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>

        </div>

      </div>
    </Link>
  );
};

export default ProductoCard;
