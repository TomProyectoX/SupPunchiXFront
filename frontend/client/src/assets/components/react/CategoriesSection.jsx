import { Link } from "react-router-dom"

const CategoriesSection = () => {
  const categories = [
    {
      name: "Proteínas",
      image: "https://img.freepik.com/foto-gratis/proteinas-gimnasia_23-2151980072.jpg?semt=ais_hybrid&w=740&q=80",
      color: "from-blue-600"
    },
    {
      name: "Creatinas",
      image: "https://meta-nutrition.com/cdn/shop/files/Beneficios_creatina_monohidratada_fuerza_rendimiento_muscular_Meta_Nutrition_M_xico.jpg?v=1776897533&width=1697",
      color: "from-purple-600"
    }
  ]

  return (
    <section className="py-16 px-2 md:px-4 bg-[#0A0A0A] w-full">
      <div className="max-w-full w-full">
        
        {/* CABECERA */}
        <div className="flex justify-between items-end mb-8 border-l-4 border-[#CCFF00] pl-4">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">
              Por Categorías
            </h2>
          </div>
        </div>

        {/* CONTENEDOR GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/shop?category=${encodeURIComponent(category.name)}`}
              className="block overflow-hidden rounded-[1.25rem] border border-[#262626] bg-[#141414] transition-all duration-300 hover:border-[#CCFF00] h-64 md:h-96"
            >
              <div className="relative h-full w-full">
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 flex items-center justify-center px-4">
                  <h3 className="text-3xl md:text-4xl font-black uppercase text-white tracking-wide drop-shadow-lg">
                    {category.name}
                  </h3>
                </div>
                <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black opacity-90 transition-opacity duration-300 group-hover:opacity-100">
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

export default CategoriesSection
