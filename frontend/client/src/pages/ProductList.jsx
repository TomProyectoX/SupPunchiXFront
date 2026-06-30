import { useEffect, useState, useMemo } from "react"
import Sidebar from "../assets/components/react/sidebar/Sidebar"
import ProductoCard from "../assets/components/react/ProductoCard"
import Navbar from "./Navbar"
import SortProducts from "../assets/components/react/sidebar/SortProducts"
import { useDispatch, useSelector } from "react-redux"
import { fetchProductos } from "../../redux/productosSlice"
import { useSearchParams } from "react-router-dom"

export default function ProductList() {

  const dispatch = useDispatch();
  const { productos, error, loading } = useSelector((state) => state.productos);
  const [searchParams] = useSearchParams();
  const search = (searchParams.get("search") || "").trim().toLocaleLowerCase("es");
  const brand = (searchParams.get("brand") || "").trim();
  const category = (searchParams.get("category") || "").trim();

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState(null);
  const [ordenPrecio, setOrdenPrecio] = useState("default");

  useEffect(() => {
    dispatch(fetchProductos());
  }, [dispatch]);

  useEffect(() => {
    const normalize = (value) =>
      String(value || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLocaleLowerCase("es");

    const brandId = brand
      ? productos.find((producto) => normalize(producto.marca?.nombre) === normalize(brand))
          ?.marca?.idMarca
      : null;
    const categoryId = category
      ? productos.find(
          (producto) => normalize(producto.categoria?.description) === normalize(category)
        )?.categoria?.id
      : null;

    setSelectedBrands(brandId != null ? [brandId] : []);
    setSelectedCategories(categoryId != null ? [categoryId] : []);
  }, [brand, category, productos]);

  const handleFilteredProductos = (filtrados) => {
    setProductosFiltrados(filtrados);
  };

  const productosOrdenados = useMemo(() => {
    const copia = (productosFiltrados ?? productos).filter((producto) => {
      if (!search) return true;
      return [
        producto.nombre,
        producto.descripcion,
        producto.marca?.nombre,
        producto.categoria?.description,
        ...(producto.variantes?.map((v) => v.sabor?.nombre) || []),
      ].some((value) => String(value || "").toLocaleLowerCase("es").includes(search));
    });

    if (ordenPrecio === "menor-mayor") {
      copia.sort((a, b) => a.precio - b.precio);
    } else if (ordenPrecio === "mayor-menor") {
      copia.sort((a, b) => b.precio - a.precio);
    }

    return copia;
  }, [productosFiltrados, ordenPrecio, search]);

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
          {search && <p className="mt-2 text-sm text-gray-400">Resultados para “{searchParams.get("search")}”</p>}
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
