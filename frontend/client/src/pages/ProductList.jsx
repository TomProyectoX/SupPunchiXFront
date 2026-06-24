import { useEffect, useState, useMemo } from "react"
import Sidebar from "../assets/components/react/sidebar/Sidebar"
import ProductoCard from "../assets/components/react/ProductoCard"
import Navbar from "./Navbar"
import SortProducts from "../assets/components/react/sidebar/SortProducts"
import { useDispatch, useSelector } from "react-redux"
import { fetchProductos } from "../../redux/productosSlice"
import { useSearchParams } from "react-router-dom"

const normalizeText = (value = "") =>
  String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const getSearchableText = (producto) =>
  normalizeText([
    producto.nombre,
    producto.descripcion,
    producto.categoria?.description,
    producto.categoria?.nombre,
    producto.marca?.nombre,
  ].filter(Boolean).join(" "));

export default function ProductList() {

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { productos, error, loading } = useSelector((state) => state.productos);
  const searchQuery = searchParams.get("search")?.trim() || "";

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [ordenPrecio, setOrdenPrecio] = useState("default");

  useEffect(() => {
    dispatch(fetchProductos());
  }, [dispatch]);

  useEffect(() => {
    if (productosFiltrados.length === 0 && productos.length > 0) {
      setProductosFiltrados(productos);
    }
  }, [productos]);

  const handleFilteredProductos = (filtrados) => {
    setProductosFiltrados(filtrados);
  };

  const productosBuscados = useMemo(() => {
    const normalizedQuery = normalizeText(searchQuery);

    if (!normalizedQuery) {
      return productosFiltrados;
    }

    return productosFiltrados.filter((producto) =>
      getSearchableText(producto).includes(normalizedQuery)
    );
  }, [productosFiltrados, searchQuery]);

  const productosOrdenados = useMemo(() => {
    const copia = [...productosBuscados];

    if (ordenPrecio === "menor-mayor") {
      copia.sort((a, b) => (a.precioFinal ?? a.precio ?? 0) - (b.precioFinal ?? b.precio ?? 0));
    } else if (ordenPrecio === "mayor-menor") {
      copia.sort((a, b) => (b.precioFinal ?? b.precio ?? 0) - (a.precioFinal ?? a.precio ?? 0));
    }

    return copia;
  }, [productosBuscados, ordenPrecio]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="bg-[#0A0A0A] text-white min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#CCFF00] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl font-black uppercase">Cargando productos...</p>
          </div>
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

      <div className="bg-[#0A0A0A] text-white min-h-screen pt-20 px-6">

        <div className="max-w-[1440px] mx-auto mb-6">
          <h1 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter text-white">
            Nuestro <span className="text-[#CCFF00]">Catálogo</span>
          </h1>
        </div>

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
                {searchQuery && (
                  <p className="text-xs text-[#CCFF00] uppercase font-black tracking-widest">
                    Busqueda: {searchQuery}
                  </p>
                )}
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

            {productosOrdenados.length === 0 && (
              <div className="rounded-2xl border border-[#262626] bg-[#111111] p-6 text-gray-400">
                No encontramos productos para esa busqueda.
              </div>
            )}
          </section>

        </div>
      </div>
    </div>
  );
}