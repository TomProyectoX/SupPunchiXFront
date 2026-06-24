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

  if (imageValue.startsWith("data:")) return imageValue;
  if (imageValue.startsWith("http://") || imageValue.startsWith("https://")) return imageValue;
  return `data:image/jpeg;base64,${imageValue}`;
};

const ProductImage = ({ producto, tienePromo, descuento }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-[#141414] to-[#050505] border border-[#262626]" style={{ aspectRatio: "1" }}>
        <img
          src={getImageSrc(producto.imagen)}
          alt={producto.nombre}
          className="w-full h-full object-contain p-8 group-hover:scale-105 transition duration-500"
          onError={(e) => {
            e.target.src = "https://static.vecteezy.com/system/resources/previews/015/656/605/non_2x/prohibited-flat-greyscale-icon-vector.jpg";
          }}
        />

        {tienePromo && (
          <div className="absolute top-4 left-4 bg-[#CCFF00] text-black px-4 py-2 font-black text-sm uppercase tracking-wider rounded-full shadow-xl">
            -{descuento}% OFF
          </div>
        )}

        <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur px-3 py-1.5 rounded-full border border-[#262626] flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${producto.disponible ? "bg-[#CCFF00]" : "bg-red-500"}`} />
          <p className="text-xs font-bold uppercase text-[#CCFF00]">
            {producto.disponible ? "En Stock" : "Agotado"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductImage;