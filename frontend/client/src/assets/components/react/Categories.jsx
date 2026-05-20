const Categories = () => {

  return (

    <section className="py-24 px-6 bg-black">

      <div className="container mx-auto">

        <h2 className="text-5xl font-black text-white uppercase mb-16 text-center">
          Shop by Category
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">

          <div className="md:col-span-2 md:row-span-2 relative overflow-hidden group border border-[#262626]">

            <img
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438"
              alt="Performance"
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

            <div className="absolute bottom-8 left-8">

              <h3 className="text-4xl font-black text-white uppercase mb-2">
                Performance
              </h3>

              <button className="text-[#CCFF00] font-bold">
                Explore →
              </button>

            </div>

          </div>

          <div className="md:col-span-2 relative overflow-hidden group border border-[#262626]">

            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b"
              alt="Recovery"
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

            <div className="absolute bottom-6 left-6">

              <h3 className="text-3xl font-black text-white uppercase mb-2">
                Recovery
              </h3>

              <button className="text-[#CCFF00] font-bold">
                Explore →
              </button>

            </div>

          </div>

          <div className="relative overflow-hidden group border border-[#262626]">

            <img
              src="https://images.unsplash.com/photo-1526401485004-2fda9f3e4a7b"
              alt="Apparel"
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

            <div className="absolute bottom-6 left-6">

              <h3 className="text-2xl font-black text-white uppercase mb-2">
                Apparel
              </h3>

              <button className="text-[#CCFF00] font-bold">
                Explore →
              </button>

            </div>

          </div>

          <div className="relative overflow-hidden group border border-[#262626]">

            <img
              src="https://images.unsplash.com/photo-1518611012118-696072aa579a"
              alt="Gear"
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

            <div className="absolute bottom-6 left-6">

              <h3 className="text-2xl font-black text-white uppercase mb-2">
                Gear
              </h3>

              <button className="text-[#CCFF00] font-bold">
                Explore →
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>

  )
}

export default Categories