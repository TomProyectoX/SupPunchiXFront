import BrandCard from "./BrandCard"

const BrandsSection = () => {
  const brands = [
    {
      name: "ENA SPORT",
      image: "https://i.imgur.com/jceJxOx.png",
      link: "/shop?brand=ENA%20SPORT",
    },
    {
      name: "STAR NUTRITION",
      image: "https://i.imgur.com/HItFoQj.jpeg",
      link: "/shop?brand=STAR%20NUTRITION",
    },
    {
      name: "GOLD NUTRITION",
      image: "https://i.imgur.com/f55YQQR.jpeg",
      link: "/shop?brand=GOLD%20NUTRITION",
    },
    {
      name: "OPTIMUM NUTRITION",
      image: "https://i.imgur.com/nWqpKlb.jpeg",
      link: "/shop?brand=OPTIMUM%20NUTRITION",
    },
  ]

  return (
    <section className="py-16 px-2 md:px-4 bg-[#0A0A0A] w-full">
      <div className="max-w-full w-full">

        <div className="flex justify-between items-end mb-8 border-l-4 border-[#CCFF00] pl-4">
          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">
            Nuestras Marcas
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {brands.map((brand, index) => (
            <BrandCard
              key={index}
              name={brand.name}
              image={brand.image}
              link={brand.link}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default BrandsSection