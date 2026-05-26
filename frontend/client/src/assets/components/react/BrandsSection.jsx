import { Link } from "react-router-dom"

const BrandsSection = () => {
  const brands = [
    {
      name: "ENA",
      logo: "https://cdn.batitienda.com/baticloud/images/product_picture_f116054f5cdb4c40b3232b56abdc62aa_637933148345028682_0_m.png",
    },
    {
      name: "STAR NUTRITION",
      logo: "https://starnutrition.com.ar/cdn/shop/files/IronPack-Strawberry.png?v=1719589259&width=750",
    },
    {
      name: "CREATINA MAX",
      logo: "https://http2.mlstatic.com/D_NQ_NP_878402-MLA87517023824_072025-O.webp",
    }
  ]

  return (
    <section className="py-16 px-2 md:px-4 bg-[#0A0A0A] w-full">
      <div className="max-w-full w-full">
        
        {/* CABECERA */}
        <div className="flex justify-between items-end mb-8 border-l-4 border-[#CCFF00] pl-4">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">
              Nuestras Marcas
            </h2>
          </div>
        </div>

        {/* CONTENEDOR GRID RESPONSIVO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {brands.map((brand, index) => (
            <Link
              key={index}
              to={`/shop?brand=${encodeURIComponent(brand.name)}`}
              className="block overflow-hidden rounded-[2rem] border border-[#262626] bg-[#141414] transition-all duration-300 hover:border-[#CCFF00]"
            >
              <div className="relative h-[280px] md:h-[340px] overflow-hidden">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/35" />
                <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-wide text-white drop-shadow-lg">
                    {brand.name}
                  </h3>
                </div>
                <div className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-black opacity-90 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="material-symbols-outlined">arrow_forward</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BrandsSection
