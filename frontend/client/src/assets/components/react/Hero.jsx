import { Link } from 'react-router-dom';
const Hero = () => {

  return (

    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">

      <div className="absolute inset-0">

        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48"
          alt="gym"
          className="w-full h-full object-cover opacity-40"
        />

        <div className="absolute inset-0 bg-black/70"></div>

      </div>

      <div className="relative z-10 text-center px-6">

        <span className="inline-block px-4 py-2 bg-[#CCFF00] text-black font-bold mb-6 uppercase">
          Elite Performance Protocols
        </span>

        <h1 className="text-white text-6xl md:text-8xl font-black uppercase leading-none">
          BOOST YOUR <br /> PERFORMANCE
        </h1>

        <p className="text-gray-300 text-xl mt-8 max-w-2xl mx-auto">
          Precision-engineered supplements for those who refuse to settle.
          No fillers. No excuses.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center mt-10">

          <Link to="/shop">
            <button className="bg-[#CCFF00] text-black px-10 py-4 font-bold uppercase hover:scale-105 transition-transform">
              Shop Now
            </button>
          </Link>

          <button className="border-2 border-white text-white px-10 py-4 font-bold uppercase hover:bg-white hover:text-black transition-all">
            View Bundles
          </button>

        </div>

      </div>

    </section>

  )
}

export default Hero