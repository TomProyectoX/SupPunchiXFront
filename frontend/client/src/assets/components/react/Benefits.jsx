const Benefits = () => {

  const beneficios = [

    {
      titulo: "Fast Shipping",
      descripcion: "Next-day delivery on all orders.",
      icono: "🚚"
    },

    {
      titulo: "Trusted Brands",
      descripcion: "Lab tested premium ingredients.",
      icono: "✔️"
    },

    {
      titulo: "Expert Support",
      descripcion: "24/7 nutrition assistance.",
      icono: "🎧"
    },

    {
      titulo: "Secure Checkout",
      descripcion: "100% safe transactions.",
      icono: "🔒"
    }

  ]

  return (

    <section className="py-24 px-6 bg-[#141414] border-y border-[#262626]">

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

        {beneficios.map((beneficio, index) => (

          <div
            key={index}
            className="flex flex-col items-center text-center"
          >

            <div className="w-20 h-20 border border-[#CCFF00] flex items-center justify-center text-4xl mb-6 bg-black">

              {beneficio.icono}

            </div>

            <h3 className="text-white text-xl font-black uppercase mb-3">
              {beneficio.titulo}
            </h3>

            <p className="text-gray-400">
              {beneficio.descripcion}
            </p>

          </div>

        ))}

      </div>

    </section>

  )
}

export default Benefits