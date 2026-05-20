const Footer = () => {

  return (

    <footer className="bg-black border-t border-[#262626] px-6 py-16">

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

        <div className="md:col-span-2">

          <h2 className="text-4xl font-black text-[#CCFF00] italic uppercase mb-6">
            IRON ARCH
          </h2>

          <p className="text-gray-400 max-w-md mb-8">
            Forging elite athletes through science-backed supplementation.
          </p>

          <div className="flex gap-4">

            <button className="w-10 h-10 border border-[#262626] hover:bg-[#CCFF00] hover:text-black transition-all">
              X
            </button>

            <button className="w-10 h-10 border border-[#262626] hover:bg-[#CCFF00] hover:text-black transition-all">
              IG
            </button>

            <button className="w-10 h-10 border border-[#262626] hover:bg-[#CCFF00] hover:text-black transition-all">
              FB
            </button>

          </div>

        </div>

        <div>

          <h3 className="text-white font-bold uppercase mb-6">
            Quick Links
          </h3>

          <ul className="space-y-4 text-gray-400">

            <li className="hover:text-[#CCFF00] cursor-pointer">
              Shop All
            </li>

            <li className="hover:text-[#CCFF00] cursor-pointer">
              Bundles
            </li>

            <li className="hover:text-[#CCFF00] cursor-pointer">
              Lab Results
            </li>

            <li className="hover:text-[#CCFF00] cursor-pointer">
              Ambassadors
            </li>

          </ul>

        </div>

        <div>

          <h3 className="text-white font-bold uppercase mb-6">
            Support
          </h3>

          <ul className="space-y-4 text-gray-400">

            <li className="hover:text-[#CCFF00] cursor-pointer">
              Contact Us
            </li>

            <li className="hover:text-[#CCFF00] cursor-pointer">
              Shipping Policy
            </li>

            <li className="hover:text-[#CCFF00] cursor-pointer">
              Refund Policy
            </li>

            <li className="hover:text-[#CCFF00] cursor-pointer">
              FAQ
            </li>

          </ul>

        </div>

      </div>

      <div className="border-t border-[#262626] mt-12 pt-8 text-center text-gray-500 text-sm">

        © 2026 IRON ARCH PERFORMANCE

      </div>

    </footer>

  )
}

export default Footer