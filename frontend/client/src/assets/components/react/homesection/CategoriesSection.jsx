import GenericCard from "./GenericCard"

const CategoriesSection = () => {
  const categories = [
    {
      name: "PROTEINA",
      image:
        "https://img.freepik.com/foto-gratis/proteinas-gimnasia_23-2151980072.jpg?semt=ais_hybrid&w=740&q=80",
      link: "/shop?category=PROTEINA",
    },

    {
      name: "CREATINA",
      image:
        "https://meta-nutrition.com/cdn/shop/files/Beneficios_creatina_monohidratada_fuerza_rendimiento_muscular_Meta_Nutrition_M_xico.jpg?v=1776897533&width=1697",
      link: "/shop?category=CREATINA",
    },
    {
      name: "BCAA",
      image:
        "https://http2.mlstatic.com/D_NQ_NP_802074-MLA109215714492_042026-O.webp",
      link: "/shop?category=BCAA",
    },

    {
      name: "PREENTRENO",
      image:
        "https://http2.mlstatic.com/D_NQ_NP_2X_769893-MLA100695241914_122025-F.webp",
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category, index) => (
            <GenericCard
              key={index}
              name={category.name}
              image={category.image}
              link={category.link}
              height="h-[280px] md:h-[340px]"
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default CategoriesSection