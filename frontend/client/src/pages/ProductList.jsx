import FilterCategories from "../assets/components/react/FilterCategories"

function ProductList() {




  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen pt-24 px-6">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row gap-6">
        
        {/* SIDEBAR */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-8">

            {/* TITLE */}
            <div className="kinetic-border pb-4">
              <h2 className="text-3xl font-black uppercase text-white leading-tight">
                Filters
              </h2>
            </div>

            {/* CATEGORY */}
            <FilterCategories type={"categoria"}/>

            {/* BRAND */}
             <FilterCategories type={"marca"}/>

            {/* FLAVOR */}
            <div className="space-y-4">
              <h3 className="text-xl font-black uppercase text-[#CCFF00]">
                Flavor
              </h3>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase text-white">Chocolate</span>
                <span className="text-xs font-bold uppercase text-white">Vanilla</span>
                <span className="text-xs font-bold uppercase text-white">Berry Blast</span>
                <span className="text-xs font-bold uppercase text-white">Fruit Punch</span>
              </div>
            </div>



  {/* PRICE */}
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <h3 className="text-xl font-black uppercase text-[#CCFF00]">
        Price Range
      </h3>
      <span className="text-white bg-[#141414] border border-[#262626] px-3 py-1 font-bold text-sm tracking-wider">
        $250
      </span>
    </div>

    <div className="w-full h-2 bg-black border border-[#262626]" />

    <div className="flex justify-between text-sm text-[#c4c9ac] font-bold">
      <span>$0</span>
      <span>$250+</span>
    </div>
  </div>


            {/* AVAILABILITY */}
            <div className="space-y-4 pt-4 border-t border-[#262626]">
              <h3 className="text-xl font-black uppercase text-[#CCFF00]">
                Availability
              </h3>

              <label className="flex items-center justify-between cursor-pointer group pt-2">
                <span className="text-xs font-bold uppercase text-white group-hover:text-[#CCFF00] transition-colors">
                  In Stock Only
                </span>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-black peer-focus:outline-none rounded-none peer peer-checked:after:translate-x-full peer-checked:after:border-black after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#262626] after:border-[#262626] after:border after:h-5 after:w-5 after:transition-all peer-checked:bg-[#CCFF00] peer-checked:after:bg-black"></div>
                </div>
              </label>
            </div>

          </div>
        </aside>

        {/* PRODUCTS */}
        <section className="flex-grow">
          <div className="flex justify-between items-end mb-8">
            <div>
              <p className="text-sm text-gray-400 uppercase mb-2">
                Showing 3 Results
              </p>

              <h1 className="text-5xl font-black uppercase italic">
                Elite Supplements
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#141414] border border-[#262626]">
              <div className="relative aspect-square overflow-hidden bg-[#1f1f1f]">
                <img
                  src="https://placehold.co/600x600"
                  alt="Protein"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white uppercase">Protein</h3>
                  <span className="text-[#CCFF00] text-2xl font-black">$59</span>
                </div>
                <p className="text-gray-400 text-sm mb-6">Basic product card.</p>
              </div>
            </div>

            <div className="bg-[#141414] border border-[#262626]">
              <div className="relative aspect-square overflow-hidden bg-[#1f1f1f]">
                <img
                  src="https://placehold.co/600x600"
                  alt="Creatine"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white uppercase">Creatine</h3>
                  <span className="text-[#CCFF00] text-2xl font-black">$39</span>
                </div>
                <p className="text-gray-400 text-sm mb-6">Basic product card.</p>
              </div>
            </div>

            <div className="bg-[#141414] border border-[#262626]">
              <div className="relative aspect-square overflow-hidden bg-[#1f1f1f]">
                <img
                  src="https://placehold.co/600x600"
                  alt="Pre Workout"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white uppercase">Pre Workout</h3>
                  <span className="text-[#CCFF00] text-2xl font-black">$45</span>
                </div>
                <p className="text-gray-400 text-sm mb-6">Basic product card.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ProductList