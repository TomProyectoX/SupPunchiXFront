import { useState, useEffect } from "react";
import FilterCategory from "./FilterCategory";
import FilterBrand from "./FilterBrand";
import FilterFlavour from "./FilterFlavour";
import FilterPrice from "./FilterPrice";

export default function Sidebar({ productos, onFilteredProductosChange }) {

  // FILTROS
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedFlavours, setSelectedFlavours] = useState([]);
  const [priceRange, setPriceRange] = useState(100000);

  // ABRIR / CERRAR SIDEBAR
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {

    if (!productos || productos.length === 0) {
      onFilteredProductosChange([]);
      return;
    }

    const filtrados = productos.filter((producto) => {

      // CATEGORY
      if (selectedCategories.length > 0) {

        if (
          !producto.categoria ||
          !selectedCategories.includes(producto.categoria.id)
        ) {
          return false;
        }
      }

      // BRAND
      if (selectedBrands.length > 0) {

        if (
          !producto.marca ||
          !selectedBrands.includes(producto.marca.idMarca)
        ) {
          return false;
        }
      }

      // FLAVOUR
      if (selectedFlavours.length > 0) {

        const tieneSabor = producto.variantes?.some((variante) =>
          selectedFlavours.includes(variante.sabor.idSabor)
        );

        if (!tieneSabor) {
          return false;
        }
      }

      // PRICE
      if (producto.precio > priceRange) {
        return false;
      }

      return true;

    });

    onFilteredProductosChange(filtrados);

  }, [
    selectedCategories,
    selectedBrands,
    selectedFlavours,
    priceRange,
    productos
  ]);

  return (

    <aside className="w-full md:w-[240px] flex-shrink-0">

      <div className="sticky top-24 bg-[#111111] border border-[#262626] p-5">

        {/* HEADER */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between pb-4 border-b border-[#262626]"
        >

          <h2 className="text-lg font-black uppercase text-white tracking-wide">
            Filters
          </h2>

          <span className="text-[#CCFF00] text-xl font-black">
            {isOpen ? "-" : "+"}
          </span>

        </button>

        {/* CONTENIDO */}
        {isOpen && (

          <div className="mt-6 space-y-8">

            {/* CATEGORY */}
            <div className="space-y-4">
              <FilterCategory
                selectedCategories={selectedCategories}
                onCategoryChange={setSelectedCategories}
              />
            </div>

            {/* BRAND */}
            <div className="space-y-4">
              <FilterBrand
                selectedBrands={selectedBrands}
                onBrandChange={setSelectedBrands}
              />
            </div>

            {/* FLAVOUR */}
            <div className="space-y-4">
              <FilterFlavour
                selectedFlavours={selectedFlavours}
                onFlavourChange={setSelectedFlavours}
              />
            </div>

            {/* PRICE */}
            <div className="space-y-4">
              <FilterPrice
                priceRange={priceRange}
                onPriceChange={setPriceRange}
              />
            </div>

          </div>

        )}

      </div>

    </aside>
  );
}