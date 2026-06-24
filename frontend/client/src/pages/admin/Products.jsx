import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../../assets/components/admin/AdminSidebar";
import AdminHeader from "../../assets/components/admin/AdminHeader";
import StatCard from "../../assets/components/admin/StatCard";
import ProductsTable from "../../assets/components/admin/ProductsTable";
import UpdateProductForm from "../../assets/components/admin/UpdateProductForm";
import { fetchProductos, deleteProducto } from "../../../redux/productosSlice";
import { fetchCategorias } from "../../../redux/categoriasSlice";
import { fetchMarcas } from "../../../redux/marcasSlice";
import { fetchSabores } from "../../../redux/saboresSlice";

export default function Products() {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { productos } = useSelector((state) => state.productos);
  const { categorias } = useSelector((state) => state.categorias);
  const { marcas } = useSelector((state) => state.marcas);
  const { sabores } = useSelector((state) => state.sabores);

  const [productoEditando, setProductoEditando] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    dispatch(fetchProductos());
    dispatch(fetchCategorias(token));
    dispatch(fetchMarcas(token));
    dispatch(fetchSabores(token));
  }, [dispatch, token]);

  const handleEdit = (producto) => {
    setProductoEditando(producto);
    setIsEditing(true);
  };

  const handleDelete = (producto) => {
    dispatch(deleteProducto({ id: producto.idProducto, token }));
  };

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen">
      <AdminSidebar />
      <AdminHeader />

      <main className="ml-64 mt-20 px-8 py-8">
        <div className="grid grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Productos"
            value={productos.length.toString()}
            unit="items"
            borderColor="border-gray-700"
          />
          <StatCard
            title="Marcas"
            value={String(new Set(productos.map((p) => p.marca?.nombre || p.marca)).size)}
            unit="brands"
            borderColor="border-green-500"
          />
          <StatCard
            title="Categorías"
            value={String(new Set(productos.map((p) => p.categoria?.description || p.categoria)).size)}
            unit="types"
            borderColor="border-yellow-500"
          />
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Productos</h2>
          <button
            onClick={() => setIsAdding(true)}
            className="rounded-md bg-[#CCFF00] px-4 py-2 text-sm font-black text-black transition-colors hover:bg-white"
          >
            + Add New Product
          </button>
        </div>

        <ProductsTable productos={productos} handleEdit={handleEdit} handleDelete={handleDelete} />

        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4">
            <div className="relative w-full max-w-2xl">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="absolute -top-10 right-0 text-sm text-gray-300 hover:text-white"
              >
                Cerrar
              </button>
              <div className="rounded-2xl border border-gray-700 bg-[#0A0A0A] shadow-[0_0_60px_rgba(0,0,0,0.65)]">
                <UpdateProductForm
                  producto={productoEditando}
                  marcas={marcas}
                  categorias={categorias}
                  sabores={sabores}
                  onClose={() => setIsEditing(false)}
                />
              </div>
            </div>
          </div>
        )}

        {isAdding && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4">
            <div className="relative w-full max-w-2xl">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="absolute -top-10 right-0 text-sm text-gray-300 hover:text-white"
              >
                Cerrar
              </button>
              <div className="rounded-2xl border border-gray-700 bg-[#0A0A0A] shadow-[0_0_60px_rgba(0,0,0,0.65)]">
                <UpdateProductForm
                  marcas={marcas}
                  categorias={categorias}
                  sabores={sabores}
                  onClose={() => setIsAdding(false)}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
