import { Link } from "react-router-dom"

const BrandsSection = () => {
  const brands = [
    {
      name: "ENA SPORT",
      logo: "https://i.imgur.com/jceJxOx.png",
    },
    {
      name: "STAR NUTRITION",
      logo: "https://i.imgur.com/HItFoQj.jpeg",
    },
    {
      name: "GOLD NUTRITION",
      logo: "https://i.imgur.com/f55YQQR.jpeg",
    },
    {
      name: "OPTIMUM NUTRITION",
      logo: "https://i.imgur.com/nWqpKlb.jpeg",
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {brands.map((brand, index) => (
            <Link
              key={index}
              to={`/shop?brand=${encodeURIComponent(brand.name)}`}
              className="block overflow-hidden rounded-[2rem] border border-[#262626] bg-[#141414] transition-all duration-300 hover:border-[#CCFF00] hover:-translate-y-1.5 hover:shadow-[0_25px_50px_-12px_rgba(204,255,0,0.2)] group flex flex-col"
            >
              <div className="h-[220px] md:h-[260px] flex items-center justify-center p-8 flex-shrink-0 bg-black relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_70%)]" />
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="relative max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="px-6 py-4 border-t border-[#262626] flex items-center justify-between">
                <span className="text-sm font-black uppercase tracking-widest text-white">
                  {brand.name}
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#CCFF00] text-black flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1">
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
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