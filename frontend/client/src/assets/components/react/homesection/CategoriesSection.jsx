import GenericCard from "./GenericCard"

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

          <GenericCard
            name={categories[0].name}
            image={categories[0].image}
            link={categories[0].link}
            height="h-[260px] md:h-[320px] lg:col-span-2"
          />

          <GenericCard
            name={categories[1].name}
            image={categories[1].image}
            link={categories[1].link}
            height="h-[260px] md:h-[320px]"
          />

          <GenericCard
            name={categories[2].name}
            image={categories[2].image}
            link={categories[2].link}
            height="h-[200px] md:h-[220px] lg:col-span-2"
          />

          <GenericCard
            name={categories[3].name}
            image={categories[3].image}
            link={categories[3].link}
            height="h-[200px] md:h-[220px]"
          />

        </div>

      </div>
    </section>
  )
}

export default CategoriesSection