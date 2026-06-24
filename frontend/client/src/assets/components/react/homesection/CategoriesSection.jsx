import { Link } from "react-router-dom"

const CategoriesSection = () => {
  const categories = [
    {
      name: "PROTEINA",
      image: "https://img.freepik.com/foto-gratis/proteinas-gimnasia_23-2151980072.jpg?semt=ais_hybrid&w=740&q=80",
      link: "/shop?category=PROTEINA",
    },
    {
      name: "CREATINA",
      image: "https://i.imgur.com/7SPGdy7.png",
      link: "/shop?category=CREATINA",
    },
    {
      name: "BCAA",
      image: "https://i.imgur.com/ZYdDTHq.png",
      link: "/shop?category=BCAA",
    },
    {
      name: "PREENTRENO",
      image: "https://i.imgur.com/E9QE7eH.png",
      link: "/shop?category=PREENTRENO",
    },
  ]

  return (
    <section className="py-16 px-2 md:px-4 bg-[#0A0A0A] w-full">
      <div className="max-w-full w-full">

        <div className="flex justify-between items-end mb-8 border-l-4 border-[#CCFF00] pl-4">
          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">
            Por Categorías
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* PROTEINA - grande, ocupa 2 columnas */}
          <Link
            to={categories[0].link}
            className="group relative block overflow-hidden rounded-[1.5rem] border border-[#262626] hover:border-[#CCFF00] transition-all duration-300 lg:col-span-2 h-[260px] md:h-[320px]"
          >
            <img
              src={categories[0].image}
              alt={categories[0].name}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 flex items-end justify-between w-full">
              <h3 className="text-3xl md:text-4xl font-black uppercase text-white tracking-wide">
                {categories[0].name}
              </h3>
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#CCFF00] text-black opacity-90 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined">arrow_forward</span>
              </div>
            </div>
          </Link>

          {/* CREATINA */}
          <Link
            to={categories[1].link}
            className="group relative block overflow-hidden rounded-[1.5rem] border border-[#262626] hover:border-[#CCFF00] transition-all duration-300 h-[260px] md:h-[320px]"
          >
            <img
              src={categories[1].image}
              alt={categories[1].name}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-5 flex items-end justify-between w-full">
              <h3 className="text-xl md:text-2xl font-black uppercase text-white tracking-wide">
                {categories[1].name}
              </h3>
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#CCFF00] text-black opacity-90 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </div>
            </div>
          </Link>

          {/* BCAA - ahora grande, ocupa 2 columnas */}
          <Link
            to={categories[2].link}
            className="group relative block overflow-hidden rounded-[1.5rem] border border-[#262626] hover:border-[#CCFF00] transition-all duration-300 lg:col-span-2 h-[200px] md:h-[220px]"
          >
            <img
              src={categories[2].image}
              alt={categories[2].name}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-5 flex items-end justify-between w-full">
              <h3 className="text-2xl md:text-3xl font-black uppercase text-white tracking-wide">
                {categories[2].name}
              </h3>
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#CCFF00] text-black opacity-90 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined">arrow_forward</span>
              </div>
            </div>
          </Link>

          {/* PREENTRENO - ahora chico */}
          <Link
            to={categories[3].link}
            className="group relative block overflow-hidden rounded-[1.5rem] border border-[#262626] hover:border-[#CCFF00] transition-all duration-300 h-[200px] md:h-[220px]"
          >
            <img
              src={categories[3].image}
              alt={categories[3].name}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-5 flex items-end justify-between w-full">
              <h3 className="text-xl md:text-2xl font-black uppercase text-white tracking-wide">
                {categories[3].name}
              </h3>
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#CCFF00] text-black opacity-90 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </div>
            </div>
          </Link>

        </div>

      </div>
    </section>
  )
}

export default CategoriesSection