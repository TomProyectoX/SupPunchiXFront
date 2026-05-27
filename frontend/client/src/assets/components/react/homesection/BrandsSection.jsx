import GenericCard from "./GenericCard"

const BrandsSection = () => {
  const brands = [
    {
      name: "ENA",
      image:
        "https://cdn.batitienda.com/baticloud/images/product_picture_f116054f5cdb4c40b3232b56abdc62aa_637933148345028682_0_m.png",
      link: "/shop?brand=ENA",
    },

    {
      name: "STAR NUTRITION",
      image:
        "https://starnutrition.com.ar/cdn/shop/files/IronPack-Strawberry.png?v=1719589259&width=750",
      link: "/shop?brand=STAR%20NUTRITION",
    },

    {
      name: "SPORT GOLD",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlbpJLzc2KdDNX-H9gbWX9BqFqFL6Iw0z5fg&s",
      link: "/shop?brand=SPORT%20GOLD",
    },

    {
      name: "ON",
      image:
        "https://http2.mlstatic.com/D_NQ_NP_2X_794907-MLA99946855777_112025-F.webp",
      link: "/shop?brand=ON",
    },
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

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {brands.map((brand, index) => (
            <GenericCard
              key={index}
              name={brand.name}
              image={brand.image}
              link={brand.link}
              height="h-[280px] md:h-[340px]"
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default BrandsSection