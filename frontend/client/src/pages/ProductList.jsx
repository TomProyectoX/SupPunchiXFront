import { useEffect, useState, useMemo } from "react"
import Sidebar from "../assets/components/react/sidebar/Sidebar"
import ProductoCard from "../assets/components/react/ProductoCard"
import Navbar from "./Navbar"
import SortProducts from "../assets/components/react/sidebar/SortProducts"
import { useDispatch, useSelector } from "react-redux"
import { fetchProductos } from "../../redux/productosSlice"

export default function ProductList() {

  const dispatch = useDispatch();
  const { productos, error, loading } = useSelector((state) => state.productos);

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [ordenPrecio, setOrdenPrecio] = useState("default");

  useEffect(() => {
    dispatch(fetchProductos());
    console.log(productos)
  }, [dispatch]);

  useEffect(() => {
    if (productosFiltrados.length === 0 && productos.length > 0) {
      setProductosFiltrados(productos);
    }
  }, [productos]);

  const handleFilteredProductos = (filtrados) => {
    setProductosFiltrados(filtrados);
  };

  const productosOrdenados = useMemo(() => {
    const copia = [...productosFiltrados];

    if (ordenPrecio === "menor-mayor") {
      copia.sort((a, b) => a.precio - b.precio);
    } else if (ordenPrecio === "mayor-menor") {
      copia.sort((a, b) => b.precio - a.precio);
    }

    return copia;
  }, [productosFiltrados, ordenPrecio]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="bg-[#0A0A0A] text-white min-h-screen flex items-center justify-center">
          <p className="text-xl font-black uppercase">Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="bg-[#0A0A0A] text-white min-h-screen flex items-center justify-center">
          <p className="text-xl text-red-400">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="bg-[#0A0A0A] text-white min-h-screen pt-24 px-6">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row gap-6">

          <Sidebar
            productos={productos}
            selectedBrands={selectedBrands}
            onSelectedBrandsChange={setSelectedBrands}
            selectedCategories={selectedCategories}
            onSelectedCategoriesChange={setSelectedCategories}
            onFilteredProductosChange={handleFilteredProductos}
          />

          <section className="flex-grow">
            <div className="flex justify-between items-end mb-8">
              <div>
                <p className="text-sm text-gray-400 uppercase mb-2">
                  Mostrando {productosOrdenados.length} Resultados
                </p>
              </div>

              <SortProducts
                ordenPrecio={ordenPrecio}
                setOrdenPrecio={setOrdenPrecio}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {productosOrdenados.map((producto) => (
                <ProductoCard
                  key={producto.idProducto}
                  producto={producto}
                />
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
