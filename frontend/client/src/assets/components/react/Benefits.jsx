const Benefits = () => {

  const beneficios = [

    {
      titulo: "Envío Rápido",
      descripcion: "Entrega en 24-48 horas.",
      icono: "local_shipping"
    },

    {
      titulo: "Marcas de Confianza",
      descripcion: "Ingredientes premium probados en laboratorio.",
      icono: "verified"
    },

    {
      titulo: "Atención al Cliente",
      descripcion: "Asistencia nutricional las 24hs.",
      icono: "support_agent"
    },

    {
      titulo: "Pago Seguro",
      descripcion: "Transacciones 100% seguras.",
      icono: "lock"
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

            <div className="w-20 h-20 rounded-full border border-[#CCFF00] flex items-center justify-center mb-6 bg-black">
              <span className="material-symbols-outlined text-[#CCFF00]" style={{ fontSize: "36px" }}>
                {beneficio.icono}
              </span>
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